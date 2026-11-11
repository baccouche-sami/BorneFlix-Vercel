import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const COOKIE_NAME = "bf_admin";
const SESSION_SECONDS = 60 * 60 * 12;

interface SessionPayload {
  sub: number;
  csrf: string;
  exp: number;
}

function sessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET manquant ou trop court");
  }
  return secret;
}

function encode(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function decode(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(body: string): string {
  return createHmac("sha256", sessionSecret()).update(body).digest("base64url");
}

export function createSessionToken(adminId: number): { token: string; csrf: string } {
  const csrf = randomBytes(32).toString("hex");
  const payload: SessionPayload = {
    sub: adminId,
    csrf,
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS,
  };
  const body = encode(JSON.stringify(payload));
  return { token: `${body}.${sign(body)}`, csrf };
}

export function readSession(req: VercelRequest): SessionPayload | null {
  const raw = readCookie(req, COOKIE_NAME);
  if (!raw) return null;

  const [body, signature] = raw.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  try {
    const payload = JSON.parse(decode(body)) as SessionPayload;
    if (
      typeof payload.sub !== "number" ||
      typeof payload.csrf !== "string" ||
      typeof payload.exp !== "number" ||
      payload.exp < Math.floor(Date.now() / 1000) ||
      !/^[a-f0-9]{64}$/.test(payload.csrf)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function setSessionCookie(res: VercelResponse, token: string): void {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_SECONDS}${secure}`,
  );
}

export function clearSessionCookie(res: VercelResponse): void {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`,
  );
}

export function csrfMatches(expected: string, received: string | undefined): boolean {
  if (!received || !/^[a-f0-9]{64}$/.test(received) || !/^[a-f0-9]{64}$/.test(expected)) {
    return false;
  }
  const left = Buffer.from(received, "hex");
  const right = Buffer.from(expected, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}

export function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(",")[0]?.trim() || "unknown";
}

function readCookie(req: VercelRequest, name: string): string | undefined {
  const header = req.headers.cookie;
  if (!header) return undefined;
  const parts = header.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}

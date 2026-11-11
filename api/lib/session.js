import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
function handler(_req, res) {
  res.status(404).json({ success: false });
}
const COOKIE_NAME = "bf_admin";
const SESSION_SECONDS = 60 * 60 * 12;
function sessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET manquant ou trop court");
  }
  return secret;
}
function encode(value) {
  return Buffer.from(value).toString("base64url");
}
function decode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}
function sign(body) {
  return createHmac("sha256", sessionSecret()).update(body).digest("base64url");
}
function createSessionToken(adminId) {
  const csrf = randomBytes(32).toString("hex");
  const payload = {
    sub: adminId,
    csrf,
    exp: Math.floor(Date.now() / 1e3) + SESSION_SECONDS
  };
  const body = encode(JSON.stringify(payload));
  return { token: `${body}.${sign(body)}`, csrf };
}
function readSession(req) {
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
    const payload = JSON.parse(decode(body));
    if (typeof payload.sub !== "number" || typeof payload.csrf !== "string" || typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1e3) || !/^[a-f0-9]{64}$/.test(payload.csrf)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
function setSessionCookie(res, token) {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_SECONDS}${secure}`
  );
}
function clearSessionCookie(res) {
  const secure = process.env.VERCEL === "1" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`
  );
}
function csrfMatches(expected, received) {
  if (!received || !/^[a-f0-9]{64}$/.test(received) || !/^[a-f0-9]{64}$/.test(expected)) {
    return false;
  }
  const left = Buffer.from(received, "hex");
  const right = Buffer.from(expected, "hex");
  return left.length === right.length && timingSafeEqual(left, right);
}
function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(",")[0]?.trim() || "unknown";
}
function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return void 0;
  const parts = header.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : void 0;
}
export {
  clearSessionCookie,
  clientIp,
  createSessionToken,
  csrfMatches,
  handler as default,
  readSession,
  setSessionCookie
};

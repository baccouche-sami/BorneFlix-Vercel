import type { VercelRequest, VercelResponse } from "@vercel/node";
import { findUserById } from "./db";
import { csrfMatches, readSession } from "./session";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(404).json({ success: false });
}

export async function requireAdmin(req: VercelRequest, res: VercelResponse) {
  let session;
  try {
    session = readSession(req);
  } catch (error) {
    console.error("Session administrateur indisponible.", error);
    res.status(500).json({
      success: false,
      message: "La session administrateur n'est pas configurée.",
    });
    return null;
  }

  if (!session) {
    res.status(401).json({
      success: false,
      message: "Vous devez vous connecter.",
    });
    return null;
  }

  const admin = await findUserById(session.sub);
  if (!admin || admin.role !== "admin") {
    res.status(401).json({
      success: false,
      message: "Session administrateur invalide.",
    });
    return null;
  }

  return { session, admin };
}

export function requireCsrf(
  res: VercelResponse,
  csrf: string,
  received: string | string[] | undefined,
): boolean {
  const token = Array.isArray(received) ? received[0] : received;
  if (!csrfMatches(csrf, token)) {
    res.status(403).json({
      success: false,
      message: "Jeton CSRF manquant ou invalide.",
    });
    return false;
  }
  return true;
}

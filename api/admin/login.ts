import bcrypt from "bcryptjs";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  countRecentLoginFailures,
  findUserByUsername,
  recordLoginFailure,
} from "../_lib/db";
import { clientIp, createSessionToken, setSessionCookie } from "../_lib/session";

const LOGIN_LIMIT = 5;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(503).json({
      success: false,
      message: "La base administrateur n'est pas configurée.",
    });
  }

  const { username, password } = req.body ?? {};
  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password ||
    username.length > 120 ||
    password.length > 1024
  ) {
    return res.status(400).json({
      success: false,
      message: "Identifiants invalides.",
    });
  }

  try {
    const ip = clientIp(req);
    const failures = await countRecentLoginFailures(ip);
    if (failures >= LOGIN_LIMIT) {
      return res.status(429).json({
        success: false,
        message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
      });
    }

    const user = await findUserByUsername(username.trim());
    const passwordValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !passwordValid || user.role !== "admin") {
      await recordLoginFailure(ip);
      return res.status(401).json({
        success: false,
        message: "Nom d'utilisateur ou mot de passe incorrect.",
      });
    }

    const { token } = createSessionToken(user.id);
    setSessionCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Connexion administrateur réussie.",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion administrateur.", error);
    return res.status(500).json({
      success: false,
      message: "Une erreur interne est survenue.",
    });
  }
}

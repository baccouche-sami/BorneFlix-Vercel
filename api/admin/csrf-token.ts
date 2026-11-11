import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../lib/admin.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  res.setHeader("Cache-Control", "no-store");

  try {
    const auth = await requireAdmin(req, res);
    if (!auth) return;

    return res.status(200).json({
      success: true,
      csrfToken: auth.session.csrf,
    });
  } catch (error) {
    console.error("Erreur de génération du jeton CSRF.", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de générer le jeton CSRF.",
    });
  }
}

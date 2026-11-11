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
      user: {
        id: auth.admin.id,
        username: auth.admin.username,
        role: auth.admin.role,
      },
    });
  } catch (error) {
    console.error("Erreur de vérification de session administrateur.", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de vérifier la session.",
    });
  }
}

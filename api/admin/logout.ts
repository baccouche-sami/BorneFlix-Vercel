import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin, requireCsrf } from "../_lib/admin";
import { clearSessionCookie } from "../_lib/session";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  try {
    const auth = await requireAdmin(req, res);
    if (!auth) return;
    if (!requireCsrf(res, auth.session.csrf, req.headers["x-csrf-token"])) return;

    clearSessionCookie(res);
    return res.status(200).json({
      success: true,
      message: "Déconnexion réussie.",
    });
  } catch (error) {
    console.error("Erreur lors de la déconnexion administrateur.", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de se déconnecter.",
    });
  }
}

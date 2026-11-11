import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin, requireCsrf } from "../../../lib/admin";
import { isQuoteStatus, updateQuoteStatus } from "../../../lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  try {
    const auth = await requireAdmin(req, res);
    if (!auth) return;
    if (!requireCsrf(res, auth.session.csrf, req.headers["x-csrf-token"])) return;

    const id = Number(req.query.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Identifiant de demande invalide.",
      });
    }

    const statut = req.body?.statut;
    if (typeof statut !== "string" || !isQuoteStatus(statut)) {
      return res.status(400).json({
        success: false,
        message: "Statut de demande invalide.",
      });
    }

    const quote = await updateQuoteStatus(id, statut);
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Demande de devis introuvable.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Statut mis à jour avec succès.",
      quote,
    });
  } catch (error) {
    console.error("Erreur lors de la modification du statut.", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de modifier le statut de la demande.",
    });
  }
}

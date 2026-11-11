import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../../_lib/admin";
import { listQuotes } from "../../_lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  res.setHeader("Cache-Control", "no-store");

  try {
    const auth = await requireAdmin(req, res);
    if (!auth) return;

    const quotes = await listQuotes();
    return res.status(200).json({ success: true, quotes });
  } catch (error) {
    console.error("Erreur lors de la récupération des devis.", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de récupérer les demandes de devis.",
    });
  }
}

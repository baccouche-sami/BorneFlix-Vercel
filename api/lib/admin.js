import { findUserById } from "./db.js";
import { csrfMatches, readSession } from "./session.js";
function handler(_req, res) {
  res.status(404).json({ success: false });
}
async function requireAdmin(req, res) {
  let session;
  try {
    session = readSession(req);
  } catch (error) {
    console.error("Session administrateur indisponible.", error);
    res.status(500).json({
      success: false,
      message: "La session administrateur n'est pas configur\xE9e."
    });
    return null;
  }
  if (!session) {
    res.status(401).json({
      success: false,
      message: "Vous devez vous connecter."
    });
    return null;
  }
  const admin = await findUserById(session.sub);
  if (!admin || admin.role !== "admin") {
    res.status(401).json({
      success: false,
      message: "Session administrateur invalide."
    });
    return null;
  }
  return { session, admin };
}
function requireCsrf(res, csrf, received) {
  const token = Array.isArray(received) ? received[0] : received;
  if (!csrfMatches(csrf, token)) {
    res.status(403).json({
      success: false,
      message: "Jeton CSRF manquant ou invalide."
    });
    return false;
  }
  return true;
}
export {
  handler as default,
  requireAdmin,
  requireCsrf
};


import { useState, type FormEvent } from "react";

export default function AdminLogin() {
  // Stocker les identifiants saisis par l'administrateur
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Gérer les messages d'erreur et l'état du chargement
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Envoyer le formulaire à notre API de connexion
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Effacer les anciennes erreurs
    setError("");
    setLoading(true);

    try {
      // Envoyer les identifiants au backend BorneFlix
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // Autoriser le navigateur à utiliser le cookie de session
        credentials: "same-origin",

        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      // Lire la réponse du serveur
      const result = await response.json();

      // Afficher une erreur si la connexion échoue
      if (!response.ok || !result.success) {
        setError(result.message || "Connexion impossible.");
        return;
      }

      // Effacer le mot de passe du formulaire
      setPassword("");

      // Rediriger vers le dashboard après une connexion réussie
      window.location.assign("/admin/dashboard");
    } catch {
      // Gérer une éventuelle erreur réseau
      setError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      // Réactiver le bouton de connexion
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">
          Administration BorneFlix
        </h1>

        <p className="mt-2 text-gray-600">
          Connectez-vous pour accéder au tableau de bord.
        </p>

        {/* Formulaire de connexion administrateur */}
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="admin-username"
              className="block text-sm font-medium"
            >
              Nom d'utilisateur
            </label>

            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium"
            >
              Mot de passe
            </label>

            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border p-3"
            />
          </div>

          {/* Afficher le message d'erreur sans exposer les identifiants */}
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Désactiver le bouton pendant la requête */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}

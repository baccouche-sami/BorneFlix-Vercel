
import { useEffect, useState } from "react";

 // Définir les informations d'une demande de devis
// Ce type correspond aux données renvoyées par PostgreSQL

 // Représenter toutes les informations d'une demande de devis
// Les propriétés correspondent aux colonnes PostgreSQL
type Quote = {
  id: number;

  // Informations personnelles du demandeur
  nom: string;
  prenom: string;
  email: string;
  telephone: string;

  // Informations sur le logement et son emplacement
  typeLogement: string;
  adresse: string;
  codePostal: string;
  ville: string;

  // Informations techniques du projet
  nombrePlacesParking: string;
  nombreResidents: string;
  typeInstallation: string;
  nombreBornes: string;
  puissanceRequise: string;

  // Informations complémentaires
  statutDemandeur: string;
  dateProjet: string;
  commentaires: string | null;

  // Suivi administratif
  statut: string;
  createdAt: string;
};



export default function Dashboard() {
  // Vérifier si la session administrateur est valide
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Conserver le jeton CSRF associé à la session administrateur
const [csrfToken, setCsrfToken] = useState<string | null>(null);

  // Afficher un chargement pendant la vérification
  const [loading, setLoading] = useState(true);

  // Stocker les demandes de devis récupérées depuis PostgreSQL
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Mémoriser le statut choisi dans le filtre du dashboard
  // "tous" signifie que toutes les demandes seront affichées
  const [statusFilter, setStatusFilter] = useState<string>("tous");
  // Mémoriser le texte saisi dans la barre de recherche
  const [searchTerm, setSearchTerm] = useState<string>("");
// Mémoriser l'ordre de tri choisi par l'administrateur
// Par défaut, les demandes les plus récentes apparaissent en premier
  const [dateSort, setDateSort] = useState<"recent" | "ancien">("recent");


  // Filtrer les demandes selon le statut sélectionné
  // Les données originales restent inchangées dans quotes
  const filteredQuotes = quotes.filter((quote) => {
    // Vérifier si le statut correspond au filtre sélectionné
    const matchesStatus =
      statusFilter === "tous" || quote.statut === statusFilter;

    // Préparer le texte recherché sans tenir compte des majuscules
    const search = searchTerm.trim().toLowerCase();

    // Vérifier si la recherche correspond aux informations du client
    const matchesSearch =
      search === "" ||
      [
        quote.nom,
        quote.prenom,
        quote.email,
        quote.telephone,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(search)
      );

    // Afficher uniquement les demandes correspondant aux deux critères
   return matchesStatus && matchesSearch;
  }).sort((a, b) => {
  // Convertir les dates des demandes en valeurs numériques
  const dateA = new Date(a.createdAt).getTime();
  const dateB = new Date(b.createdAt).getTime();

  // Afficher les demandes les plus anciennes en premier
  if (dateSort === "ancien") {
    return dateA - dateB;
  }

  // Par défaut, afficher les demandes les plus récentes en premier
  return dateB - dateA;
  });


  // Calculer les statistiques à partir des demandes chargées
  // Les valeurs se mettent à jour automatiquement lorsque quotes change
  const quoteStats = {
    total: quotes.length,

    nouveau: quotes.filter(
      (quote) => quote.statut === "nouveau"
    ).length,

    enCours: quotes.filter(
      (quote) => quote.statut === "en_cours"
    ).length,

    devisEnvoye: quotes.filter(
      (quote) => quote.statut === "devis_envoye"
    ).length,

    traite: quotes.filter(
      (quote) => quote.statut === "traite"
    ).length,
  };


  // Indiquer si les demandes sont en cours de chargement
  const [quotesLoading, setQuotesLoading] = useState(true);

  // Stocker un éventuel message d'erreur
  const [quotesError, setQuotesError] = useState("");
  // Stocker la demande sélectionnée par l'administrateur
  // null signifie qu'aucune demande n'est sélectionnée
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Mémoriser la demande dont le statut est en cours de modification
  const [updatingQuoteId, setUpdatingQuoteId] = useState<number | null>(null);

  // Afficher un message si la modification échoue
  const [statusError, setStatusError] = useState("");



  useEffect(() => {
    // Permettre d'annuler la requête si le composant est démonté
    const controller = new AbortController();

    // Vérifier la session auprès du serveur
    const checkAdminSession = async () => {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "same-origin",
          signal: controller.signal,
        });

        // Refuser l'accès si la session est absente ou invalide
        if (!response.ok) {
          window.location.replace("/admin/login");
          return;
        }

        const result = await response.json();

        // Vérifier également le rôle administrateur
        if (result.success && result.user?.role === "admin") {
          setIsAuthenticated(true);
        } else {
          window.location.replace("/admin/login");
        }
      } catch (error) {
        // Ignorer les requêtes volontairement annulées
        if (controller.signal.aborted) return;

        // Ne pas afficher le dashboard en cas d'erreur réseau
        window.location.replace("/admin/login");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    checkAdminSession();

    // Nettoyer la requête lorsque le composant est démonté
    return () => controller.abort();
  }, []);

  // Charger les demandes uniquement après validation de la session
  useEffect(() => {
    if (!isAuthenticated) return;

    // Permettre d'annuler la requête si la page est quittée
    const controller = new AbortController();

    const loadQuotes = async () => {
      setQuotesLoading(true);
      setQuotesError("");

      try {
        // Appeler l'API protégée des demandes de devis
        const response = await fetch("/api/admin/quotes", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
        });

        // Rediriger si la session n'est plus valide
        if (response.status === 401 || response.status === 403) {
          window.location.replace("/admin/login");
          return;
        }

        // Vérifier que le serveur a répondu correctement
        if (!response.ok) {
          throw new Error("Erreur de chargement des devis.");
        }

        // Lire les données renvoyées par notre API
        const result = await response.json();

        if (!result.success || !Array.isArray(result.quotes)) {
          throw new Error("Réponse invalide du serveur.");
        }

        // Enregistrer les demandes dans React
        if (!controller.signal.aborted) {
          setQuotes(result.quotes);
        }
      } catch {
        // Ne pas afficher d'erreur pour une requête annulée
        if (controller.signal.aborted) return;

        setQuotesError("Impossible de charger les demandes de devis.");
      } finally {
        if (!controller.signal.aborted) {
          setQuotesLoading(false);
        }
      }
    };

    loadQuotes();

    // Annuler la requête lorsque le composant est démonté
    return () => controller.abort();
  }, [isAuthenticated]);

  // Récupérer le jeton CSRF après vérification de la session admin
  useEffect(() => {
    // Ne rien demander tant que l'administrateur n'est pas authentifié
    if (!isAuthenticated) {
      setCsrfToken(null);
      return;
    }

    // Permettre d'annuler la requête si le composant est démonté
    const controller = new AbortController();

    const loadCsrfToken = async () => {
      try {
        // Demander au serveur le jeton associé à la session
        const response = await fetch("/api/admin/csrf-token", {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
        });

        // Rediriger si la session administrateur a expiré
        if (response.status === 401 || response.status === 403) {
          window.location.replace("/admin/login");
          return;
        }

        // Refuser une réponse HTTP incorrecte
        if (!response.ok) {
          throw new Error("Impossible de récupérer le jeton CSRF.");
        }

        const result = await response.json();

        // Vérifier le format du jeton retourné par le serveur
        if (
          result.success !== true ||
          typeof result.csrfToken !== "string" ||
          !/^[a-f0-9]{64}$/.test(result.csrfToken)
        ) {
          throw new Error("Jeton CSRF invalide.");
        }

        // Conserver le jeton uniquement dans l'état React
        setCsrfToken(result.csrfToken);
      } catch (error) {
        // Ignorer les annulations normales de requête
        if (controller.signal.aborted) return;

        // Ne pas afficher le jeton ni les détails internes
        console.error("Impossible de préparer la sécurité du dashboard.");
        setCsrfToken(null);
      }
    };

    loadCsrfToken();

    // Annuler la requête lorsque le composant est démonté
    return () => controller.abort();
  }, [isAuthenticated]);


  // Modifier le statut d'une demande depuis le dashboard
  const handleStatusChange = async (id: number, statut: string) => {
    // Éviter plusieurs modifications simultanées
    if (updatingQuoteId !== null) return;
    // Refuser la modification si le jeton CSRF n'est pas disponible
if (!csrfToken) {
  alert("Sécurité en cours d'initialisation. Veuillez réessayer.");
  return;
}

    setUpdatingQuoteId(id);
    setStatusError("");

    try {
      // Envoyer le nouveau statut à l'API sécurisée
      const response = await fetch(`/api/admin/quotes/${id}/status`, {
        method: "PATCH",
        credentials: "same-origin",
        headers: {
  "Content-Type": "application/json",

  // Envoyer le jeton CSRF au serveur
  "X-CSRF-Token": csrfToken,
},
        body: JSON.stringify({ statut }),
      });


      // Rediriger uniquement si la session administrateur a expiré
      if (response.status === 401) {
        window.location.replace("/admin/login");
        return;
      }

      // Signaler un refus de sécurité sans déconnecter l'administrateur
      if (response.status === 403) {
        setStatusError(
          "Vérification de sécurité échouée. Actualisez la page et réessayez."
        );
        return;
      }


      // Vérifier le résultat de la modification
      if (!response.ok) {
        throw new Error("Impossible de modifier le statut.");
      }

      const result = await response.json();

      if (!result.success || result.quote?.statut !== statut) {
        throw new Error("Réponse invalide du serveur.");
      }

      // Mettre à jour le statut dans le tableau sans recharger la page
      setQuotes((previousQuotes) =>
        previousQuotes.map((quote) =>
          quote.id === id ? { ...quote, statut } : quote
        )
      );

      // Actualiser également la fenêtre des détails si elle est ouverte
      setSelectedQuote((previousQuote) =>
        previousQuote?.id === id
          ? { ...previousQuote, statut }
          : previousQuote
      );
    } catch {
      // Conserver l'ancien statut si la modification échoue
      setStatusError("La modification du statut a échoué. Réessayez.");
    } finally {
      setUpdatingQuoteId(null);
    }
  };

  // Déconnecter l'administrateur et supprimer sa session

const handleLogout = async () => {
  // Empêcher la déconnexion si le jeton CSRF n'est pas disponible
  if (!csrfToken) {
    alert("Sécurité en cours d'initialisation. Veuillez réessayer.");
    return;
  }

  try {
    // Demander au serveur de détruire la session administrateur
    const response = await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        // Envoyer le jeton CSRF associé à la session
        "X-CSRF-Token": csrfToken,
      },
    });

    // Si la session a expiré, retourner à la connexion
    if (response.status === 401) {
      window.location.replace("/admin/login");
      return;
    }

    // Si le jeton CSRF est refusé, ne pas considérer la déconnexion comme réussie
    if (response.status === 403) {
      alert(
        "Vérification de sécurité échouée. Actualisez la page et réessayez."
      );
      return;
    }

    // Vérifier que le serveur a accepté la déconnexion
    if (!response.ok) {
      throw new Error("Échec de la déconnexion.");
    }

    // Rediriger après la destruction de la session
    window.location.replace("/admin/login");
  } catch {
    // Signaler une erreur réseau ou serveur
    alert("Impossible de se déconnecter. Veuillez réessayer.");
  }
};





  // Afficher un message pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Vérification de la session administrateur...
        </p>
      </div>
    );
  }

  // Ne jamais afficher le contenu sans session validée
  if (!isAuthenticated) {
    return null;
  }

  // Afficher le dashboard uniquement après validation

  // Afficher le dashboard après validation de la session
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* Titre du tableau de bord */}
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de bord BorneFlix
        </h1>
        {/* Bouton permettant à l'administrateur de se déconnecter */}
  <button
    type="button"
    onClick={handleLogout}
    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
  >
    Se déconnecter
  </button>

        <p className="mt-2 text-gray-600">
          Gestion et suivi des demandes de devis
        </p>

{/* Cartes de statistiques des demandes de devis */}
<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

  {/* Nombre total de demandes */}
  <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
    <p className="text-sm font-medium text-gray-600">
      Total des demandes
    </p>
    <p className="mt-2 text-3xl font-bold text-gray-900">
      {quoteStats.total}
    </p>
  </div>

  {/* Demandes nouvellement reçues */}
  <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
    <p className="text-sm font-medium text-blue-700">
      Nouvelles
    </p>
    <p className="mt-2 text-3xl font-bold text-blue-800">
      {quoteStats.nouveau}
    </p>
  </div>

  {/* Demandes en cours de traitement */}
  <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
    <p className="text-sm font-medium text-orange-700">
      En cours
    </p>
    <p className="mt-2 text-3xl font-bold text-orange-800">
      {quoteStats.enCours}
    </p>
  </div>

  {/* Demandes pour lesquelles un devis a été envoyé */}
  <div className="rounded-xl border border-purple-200 bg-purple-50 p-5">
    <p className="text-sm font-medium text-purple-700">
      Devis envoyés
    </p>
    <p className="mt-2 text-3xl font-bold text-purple-800">
      {quoteStats.devisEnvoye}
    </p>
  </div>

  {/* Demandes entièrement traitées */}
  <div className="rounded-xl border border-green-200 bg-green-50 p-5">
    <p className="text-sm font-medium text-green-700">
      Traitées
    </p>
    <p className="mt-2 text-3xl font-bold text-green-800">
      {quoteStats.traite}
    </p>
  </div>

</div>

        {/* Afficher un message si la modification du statut échoue */}
        { statusError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {statusError}
          </p>
        )}

        {/* Titre du tableau et nombre de demandes affichées */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-semibold text-gray-900">
            Liste des demandes de devis
          </h2>
          {/* Afficher le nombre de résultats après filtrage et recherche */}
  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
    {filteredQuotes.length} résultat(s) sur {quotes.length}
  </span>

{/* Filtrer les demandes de devis selon leur statut */}
<div className="mb-5 flex flex-wrap items-center gap-3">
  <label
    htmlFor="statusFilter"
    className="text-sm font-medium text-gray-700"
  >
    Filtrer par statut :
  </label>

  {/* Menu déroulant de sélection du statut */}
  <select
    id="statusFilter"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
  >
    <option value="tous">Tous les statuts</option>
    <option value="nouveau">Nouveau</option>
    <option value="en_cours">En cours</option>
    <option value="devis_envoye">Devis envoyé</option>
    <option value="traite">Traité</option>
  </select>
</div>
{/* Menu permettant de trier les demandes selon leur date */}
<div className="mb-5 flex flex-wrap items-center gap-3">
  {/* Libellé du menu de tri */}
  <label
    htmlFor="dateSort"
    className="text-sm font-medium text-gray-700"
  >
    Trier par date :
  </label>
  {/* Choisir l'ordre d'affichage des demandes */}
  <select
    id="dateSort"
    value={dateSort}
    onChange={(e) =>
      setDateSort(e.target.value as "recent" | "ancien")
    }
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
  >
    <option value="recent">Plus récentes d'abord</option>
    <option value="ancien">Plus anciennes d'abord</option>
  </select>
</div>


{/* Barre de recherche des demandes de devis */}
<div className="mb-5">
  {/* Libellé du champ de recherche */}
  <label
    htmlFor="searchClient"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Rechercher un client :
  </label>

  {/* Champ permettant de rechercher un client */}
  <input
    id="searchClient"
    type="search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Nom, prénom, email ou téléphone..."
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:max-w-md"
  />

{/* Bouton permettant de réinitialiser la recherche et le filtre */}
{(searchTerm !== "" || statusFilter !== "tous") && (
  <div className="mb-5">
    <button
      type="button"
      // Effacer le texte de recherche et réafficher tous les statuts
      onClick={() => {
        setSearchTerm("");
        setStatusFilter("tous");
      }}
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
    >
      Réinitialiser les filtres
    </button>
  </div>
)}

</div>



          {/* Message pendant le chargement */}
          {quotesLoading ? (
            <p className="text-gray-600">
              Chargement des demandes...
            </p>
          ) : quotesError ? (
            /* Message si l'API rencontre une erreur */
            <p role="alert" className="text-red-600">
              {quotesError}
            </p>
          ) : quotes.length === 0 ? (
            /* Message lorsqu'aucune demande n'existe */
            <p className="text-gray-600">
              Aucune demande de devis pour le moment.
            </p>
          ) : (
            /* Tableau des demandes récupérées */
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">N°</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Ville</th>
                    <th className="p-3">Installation</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>

{/* Afficher un message si aucune demande ne correspond aux filtres */}
{!quotesLoading && !quotesError && filteredQuotes.length === 0 && (
  <tr>
    {/* Le message occupe les 7 colonnes du tableau */}
    <td
      colSpan={7}
      className="px-4 py-10 text-center text-gray-500"
    >
      <p className="font-medium text-gray-700">
        Aucune demande trouvée
      </p>

      <p className="mt-2 text-sm">
        Essayez un autre nom, prénom, email ou statut.
      </p>
    </td>
  </tr>
)}

                  {filteredQuotes.map((quote) => (
                    <tr
                      key={quote.id}
                      className="border-b hover:bg-gray-50"
                    >
                      {/* Identifiant de la demande */}
                      <td className="p-3">{quote.id}</td>

                      {/* Nom complet du demandeur */}
                      <td className="p-3">
                        {quote.prenom} {quote.nom}
                      </td>

                      {/* Ville du projet */}
                      <td className="p-3">{quote.ville}</td>

                      {/* Type d'installation demandé */}
                      <td className="p-3">
                        {quote.typeInstallation}
                      </td>

                      {/* Date de réception de la demande */}
                      <td className="p-3">
                        {quote.createdAt
                          ? new Date(quote.createdAt).toLocaleDateString("fr-FR")
                          : "—"}
                      </td>

                      {/* Statut actuel de la demande */}

{/* Menu déroulant permettant de modifier le statut d'une demande */}
<td className="p-3">
  <select
    aria-label={`Statut de la demande ${quote.id}`}
    value={quote.statut}
    disabled={updatingQuoteId !== null}
    onChange={(e) => handleStatusChange(quote.id, e.target.value)}

    // Appliquer une couleur différente selon le statut
    className={`rounded-lg border px-3 py-2 text-sm font-medium ${
      quote.statut === "nouveau"
        ? "border-blue-200 bg-blue-100 text-blue-800"
        : quote.statut === "en_cours"
        ? "border-orange-200 bg-orange-100 text-orange-800"
        : quote.statut === "devis_envoye"
        ? "border-purple-200 bg-purple-100 text-purple-800"
        : quote.statut === "traite"
        ? "border-green-200 bg-green-100 text-green-800"
        : "border-gray-300 bg-white text-gray-800"
    }`}
  >
    <option value="nouveau">Nouveau</option>
    <option value="en_cours">En cours</option>
    <option value="devis_envoye">Devis envoyé</option>
    <option value="traite">Traité</option>
  </select>
</td>

                      <td className="p-3">
                        <button
                        type="button"
                        onClick={() => setSelectedQuote(quote)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Voir les détails

                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

{/* Fenêtre des détails de la demande sélectionnée */}
{selectedQuote && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onClick={() => setSelectedQuote(null)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-details-title"
      className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* En-tête de la fenêtre */}
      <div className="flex items-center justify-between gap-4">
        <h2
          id="quote-details-title"
          className="text-xl font-bold text-gray-900"
        >
          Demande de devis n° {selectedQuote.id}
        </h2>

        <button
          type="button"
          onClick={() => setSelectedQuote(null)}
          aria-label="Fermer les détails"
          className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
        >
          ✕
        </button>
      </div>

      {/* Informations du demandeur */}
      <section className="mt-6">
        <h3 className="mb-3 font-semibold text-gray-900">
          Informations du client
        </h3>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p><strong>Nom :</strong> {selectedQuote.nom}</p>
          <p><strong>Prénom :</strong> {selectedQuote.prenom}</p>
          <p><strong>E-mail :</strong> {selectedQuote.email}</p>
          <p><strong>Téléphone :</strong> {selectedQuote.telephone}</p>
          <p><strong>Statut du demandeur :</strong> {selectedQuote.statutDemandeur}</p>
        </div>
      </section>

      {/* Informations du logement */}
      <section className="mt-6 border-t pt-4">
        <h3 className="mb-3 font-semibold text-gray-900">
          Informations du logement
        </h3>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p><strong>Type :</strong> {selectedQuote.typeLogement}</p>
          <p><strong>Adresse :</strong> {selectedQuote.adresse}</p>
          <p><strong>Code postal :</strong> {selectedQuote.codePostal}</p>
          <p><strong>Ville :</strong> {selectedQuote.ville}</p>
          <p><strong>Places de parking :</strong> {selectedQuote.nombrePlacesParking}</p>
          <p><strong>Résidents :</strong> {selectedQuote.nombreResidents}</p>
        </div>
      </section>

      {/* Informations techniques du projet */}
      <section className="mt-6 border-t pt-4">
        <h3 className="mb-3 font-semibold text-gray-900">
          Informations du projet
        </h3>

        <div className="grid gap-3 text-sm sm:grid-cols-2">
          <p><strong>Installation :</strong> {selectedQuote.typeInstallation}</p>
          <p><strong>Nombre de bornes :</strong> {selectedQuote.nombreBornes}</p>
          <p><strong>Puissance requise :</strong> {selectedQuote.puissanceRequise}</p>
          <p><strong>Date du projet :</strong> {selectedQuote.dateProjet}</p>
          <p><strong>Statut :</strong> {selectedQuote.statut}</p>
        </div>
      </section>

      {/* Commentaires supplémentaires */}
      <section className="mt-6 border-t pt-4">
        <h3 className="mb-3 font-semibold text-gray-900">
          Commentaires
        </h3>

        <p className="whitespace-pre-wrap break-words text-sm text-gray-700">
          {selectedQuote.commentaires || "Aucun commentaire."}
        </p>
      </section>

      {/* Bouton de fermeture */}
      <div className="mt-6 flex justify-end border-t pt-4">
        <button
          type="button"
          onClick={() => setSelectedQuote(null)}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );

}

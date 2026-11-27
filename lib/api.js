const BASE = process.env.API_URL ?? "http://localhost:3000";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function appel(chemin, { methode = "GET", corps, token } = {}) {
  let reponse;
  try {
    reponse = await fetch(BASE + chemin, {
      method: methode,
      headers: {
        ...(corps !== undefined && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: corps !== undefined ? JSON.stringify(corps) : undefined,
      cache: "no-store", // données toujours fraîches
    });
  } catch {
    throw new ApiError("L'API est injoignable (" + BASE + ").", 500);
  }

  // Certaines réponses (DELETE) peuvent avoir un corps vide.
  let data = await reponse.json();

  if (!reponse.ok) {
    // NestJS renvoie { statusCode, message, error } ; message peut être un tableau.
    const brut = data?.message ?? data?.error ?? reponse.statusText;

    const message = Array.isArray(brut) ? brut.join(" ") : String(brut);
    throw new ApiError(message, reponse.status);
  }
  return data;
}

export const apiAuth = {
  // signup ne renvoie pas de jeton : l'utilisateur se connecte ensuite.
  inscription: (corps) => appel("/auth/signup", { methode: "POST", corps }),
  connexion: (corps) => appel("/auth/signin", { methode: "POST", corps }),
};

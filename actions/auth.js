"use server";
import { redirect } from "next/navigation";
import { apiAuth } from "@/lib/api";
import { decodeJwt } from "jose";
import { createSession, destroySession } from "@/lib/auth";

export async function connexion(prevState, formData) {
  const identifiant = String(formData.get("identifiant") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!identifiant || !password)
    return { erreur: "Identifiant et mot de passe obligatoires." };

  let profil;
  try {
    const { access_token } = await apiAuth.connexion({ identifiant, password });

    const claims = decodeJwt(access_token); // lecture seule, pas de vérification
    profil = {
      id: claims.id,
      role: claims.role === "admin" ? "admin" : "user",
      email: claims.email,
      username: claims.username,
      apiToken: access_token,
    };
    await createSession(profil);
  } catch (e) {
    return { erreur: e.message };
  }
  // "suite" = page demandée avant la redirection vers /login (posée par proxy.js).
  const suite = String(formData.get("suite") ?? "");
  const suiteValide = suite.startsWith("/") && !suite.startsWith("//");

  redirect(
    suiteValide ? suite : profil.role === "admin" ? "/admin/livres" : "/livres",
  );
}

export async function deconnexion() {
  await destroySession();
  redirect("/");
}

export async function inscription(prevState, formData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email.includes("@"))
    return { erreur: "Saisis une adresse e-mail valide." };
  if (!username) return { erreur: "Le nom d'utilisateur est obligatoire." };
  if (password.length < 6)
    return { erreur: "Le mot de passe fait au moins 6 caractères." };
  try {
    await apiAuth.inscription({ email, username, password });
  } catch (e) {
    return { erreur: e.message }; // e-mail ou username déjà pris : message de l'API
  }
  redirect("/login"); // hors du try : redirect() lève une exception interne;
}

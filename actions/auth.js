"use server";
import { redirect } from "next/navigation";
import { apiAuth } from "@/lib/api";
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

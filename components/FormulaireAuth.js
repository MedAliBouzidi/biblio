"use client";
import { useActionState } from "react";
export default function FormulaireAuth({
  action,
  libelle,
  inscription = false,
  suite = "",
}) {
  // etat = valeur renvoyée par la Server Action ; enCours = true pendant l'envoi
  const [etat, formAction, enCours] = useActionState(action, {});
  return (
    <form action={formAction}>
      {etat?.erreur && (
        <p className="alert alert-danger py-2 small">{etat.erreur}</p>
      )}

      <input type="hidden" name="suite" value={suite} />
      {inscription ? (
        <>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Adresse e-mail
            </label>

            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Nom d&apos;utilisateur
            </label>

            <input
              className="form-control"
              id="username"
              name="username"
              maxLength={30}
              required
            />
          </div>
        </>
      ) : (
        <div className="mb-3">
          <label className="form-label" htmlFor="identifiant">
            Nom d&apos;utilisateur ou e-mail
          </label>

          <input
            className="form-control"
            id="identifiant"
            name="identifiant"
            required
          />
        </div>
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor="password">
          Mot de passe
        </label>

        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <button className="btn btn-dark w-100" disabled={enCours}>
        {enCours ? "Un instant..." : libelle}
      </button>
    </form>
  );
}

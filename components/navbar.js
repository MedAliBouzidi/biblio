import Link from "next/link";
import { deconnexion } from "@/actions/auth";
import { getSession } from "@/lib/auth";

export default async function Navbar() {
  const session = await getSession();
  return (
    <nav className="navbar navbar-expand border-bottom mb-4">
      <div className="container">
        <Link className="navbar-brand" href="/">
          {" "}
          Biblio
        </Link>
        {!session ? (
          <div className="d-flex gap-2">
            <Link className="btn btn-sm btn-outline-secondary" href="/login">
              Se connecter
            </Link>

            <Link className="btn btn-sm btn-dark" href="/inscription">
              Créer un compte
            </Link>
          </div>
        ) : (
          <>
            <div className="navbar-nav me-auto">
              <Link className="nav-link" href="/livres">
                Catalogue
              </Link>

              <Link className="nav-link" href="/favoris">
                Favoris
              </Link>

              {session.role === "admin" && (
                <>
                  <Link className="nav-link" href="/admin/livres">
                    Gérer les livres
                  </Link>

                  <Link className="nav-link" href="/admin/auteurs">
                    Gérer les auteurs
                  </Link>
                </>
              )}
            </div>

            <form
              action={deconnexion}
              className="d-flex align-items-center gap-3"
            >
              <span className="text-secondary small">
                Bonjour,
                {session.username}
              </span>

              <button className="btn btn-sm btn-outline-secondary">
                Se déconnecter
              </button>
            </form>
          </>
        )}
      </div>
    </nav>
  );
}

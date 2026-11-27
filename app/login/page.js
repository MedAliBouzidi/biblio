import { redirect } from "next/navigation";
import { connexion } from "@/actions/auth";
import FormulaireAuth from "@/components/FormulaireAuth";
import { getSession } from "@/lib/auth";

export default async function Login({ searchParams }) {
  if (await getSession()) redirect("/");
  const { suite } = await searchParams;
  return (
    <div className="etroit mx-auto py-4">
      <h1 className="h4 mb-3">Connexion</h1>
      <FormulaireAuth
        action={connexion}
        libelle="Se connecter"
        suite={suite ?? ""}
      />
    </div>
  );
}

import { inscription } from "@/actions/auth";
import FormulaireAuth from "@/components/FormulaireAuth";
export default function Inscription() {
  return (
    <div className="etroit mx-auto py-4">
      <h1 className="h4 mb-3">Inscription</h1>
      <FormulaireAuth
        action={inscription}
        libelle="Créer le compte"
        inscription
      />
    </div>
  );
}

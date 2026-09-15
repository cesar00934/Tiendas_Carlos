import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="notFound">
      <span>404</span>
      <h1>Este producto no está aquí</h1>
      <p>Puede que haya cambiado de nombre o ya no forme parte del catálogo.</p>
      <Link className="primaryButton" href="/productos"><ArrowLeft size={18} /> Volver al catálogo</Link>
    </main>
  );
}

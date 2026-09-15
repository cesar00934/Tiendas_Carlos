import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Productos para el hogar",
  description: `Explora el catálogo de ${siteConfig.name}: cocina, dormitorio, organización, electrodomésticos y más. Consulta por WhatsApp.`,
  alternates: { canonical: "/productos" },
};

type ProductsPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";

  return (
    <main className="pageMain">
      <section className="catalogHero">
        <span className="eyebrow"><i /> Precios en soles</span>
        <h1>Todo el catálogo, fácil de encontrar</h1>
        <p>Filtra por nombre, categoría o precio. Abre cualquier producto para verlo mejor y consultar directamente por WhatsApp.</p>
      </section>
      <CatalogExplorer products={products} initialQuery={query} compactHeading />
    </main>
  );
}

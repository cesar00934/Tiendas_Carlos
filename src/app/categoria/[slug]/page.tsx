import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { JsonLd } from "@/components/JsonLd";
import { categories, products } from "@/data/products";
import { siteConfig } from "@/config/site";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: `${category.name} para el hogar`,
    description: `Encuentra ${category.name.toLocaleLowerCase("es-PE")} en Tiendas Carlos. Precios en soles y consulta directa por WhatsApp.`,
    alternates: { canonical: `/categoria/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.categorySlug === slug);
  const categoryUrl = `${siteConfig.url}/categoria/${category.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Productos", item: `${siteConfig.url}/productos` },
      { "@type": "ListItem", position: 3, name: category.name, item: categoryUrl },
    ],
  };

  return (
    <main className="pageMain">
      <JsonLd data={breadcrumb} />
      <section className="catalogHero categoryHero">
        <Link className="backLink" href="/productos"><ArrowLeft size={16} /> Todos los productos</Link>
        <span className="eyebrow"><i /> Categoría</span>
        <h1>{category.name}</h1>
        <p>{categoryProducts.length} productos con precio publicado para consultar por WhatsApp.</p>
      </section>
      <CatalogExplorer products={categoryProducts} initialCategory={category.name} compactHeading />
    </main>
  );
}

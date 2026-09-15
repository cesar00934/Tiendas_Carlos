import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { productWhatsAppMessage, siteConfig, whatsappUrl } from "@/config/site";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: `${product.name} a ${formatPrice(product.price)} en Tiendas Carlos. ${product.description} Consulta por WhatsApp o visítanos en ${siteConfig.address}.`,
    alternates: { canonical: `/producto/${product.slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .slice(0, 4);
  const message = productWhatsAppMessage(product.name, product.slug, formatPrice(product.price));
  const productUrl = `${siteConfig.url}/producto/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${siteConfig.url}${product.largeImage}`],
    description: product.description,
    category: product.category,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "PEN",
      price: product.price.toFixed(2),
      seller: { "@id": `${siteConfig.url}/#store` },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: product.category, item: `${siteConfig.url}/categoria/${product.categorySlug}` },
      { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
    ],
  };

  return (
    <main className="pageMain">
      <JsonLd data={[productJsonLd, breadcrumbJsonLd]} />
      <div className="breadcrumbs">
        <Link href="/productos"><ArrowLeft size={16} /> Catálogo</Link>
        <span>/</span>
        <Link href={`/categoria/${product.categorySlug}`}>{product.category}</Link>
      </div>
      <article className="productDetail">
        <div className="detailImage">
          <Image
            src={product.largeImage}
            alt={product.name}
            width={product.largeWidth}
            height={product.largeHeight}
            sizes="(max-width: 900px) 100vw, 52vw"
            unoptimized
            preload
          />
        </div>
        <div className="detailContent">
          <Link className="detailCategory" href={`/categoria/${product.categorySlug}`}>{product.category}</Link>
          <h1>{product.name}</h1>
          <p className="detailDescription">{product.description}</p>
          {product.variants?.length ? (
            <div className="variantList">
              <span>Presentaciones</span>
              {product.variants.map((variant) => (
                <div key={variant.label}><strong>{variant.label}</strong><b>{formatPrice(variant.price)}</b></div>
              ))}
            </div>
          ) : (
            <div className="detailPrice"><span>Precio</span><strong>{formatPrice(product.price)}</strong></div>
          )}
          <p className="priceNote"><ShieldCheck size={17} aria-hidden="true" /> Precio registrado según la información entregada por la tienda.</p>
          <div className="detailActions">
            <a className="primaryButton whatsappButton" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" /> Consultar por WhatsApp
            </a>
            <a className="secondaryButton" href={siteConfig.phoneHref}><Phone aria-hidden="true" /> Llamar ahora</a>
          </div>
          <a className="detailAddress" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" /> Disponible para consultar en {siteConfig.address}
          </a>
          <p className="sku">Código: {product.id}</p>
        </div>
      </article>
      {related.length ? (
        <section className="relatedSection">
          <div className="sectionHeading"><div><span className="eyebrow"><i /> También te puede gustar</span><h2>Más de {product.category}</h2></div></div>
          <div className="productGrid relatedGrid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div>
        </section>
      ) : null}
    </main>
  );
}

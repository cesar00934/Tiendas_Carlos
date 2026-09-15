import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, MessageCircle, Phone, Search, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { StoreSection } from "@/components/StoreSection";
import { categories, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/config/site";

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 8);
  const heroProducts = featured.slice(0, 3);
  const storeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: siteConfig.tagline,
        inLanguage: "es-PE",
        publisher: { "@id": `${siteConfig.url}/#store` },
      },
      {
        "@type": "Store",
        "@id": `${siteConfig.url}/#store`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/mark-512.png`,
        image: `${siteConfig.url}/opengraph-image.jpg`,
        telephone: siteConfig.phoneE164,
        priceRange: "S/",
        currenciesAccepted: "PEN",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address,
          addressCountry: "PE",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.phoneE164,
          contactType: "customer service",
          availableLanguage: "Spanish",
        },
      },
    ],
  };

  return (
    <main>
      <JsonLd data={storeJsonLd} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="heroCopy">
          <span className="eyebrow"><i /> La tienda del hogar</span>
          <h1 id="hero-title">Tu hogar, más práctico y bonito.</h1>
          <p>Descubre productos para cocina, dormitorio, organización y más, con precios claros y atención directa.</p>
          <form className="heroSearch" action="/productos">
            <Search aria-hidden="true" size={21} />
            <label className="srOnly" htmlFor="home-search">Buscar en el catálogo</label>
            <input id="home-search" name="q" type="search" placeholder="¿Qué estás buscando?" />
            <button type="submit">Buscar <ArrowRight aria-hidden="true" size={18} /></button>
          </form>
          <div className="heroActions">
            <Link className="primaryButton" href="/productos">Ver los {products.length} productos <ArrowRight aria-hidden="true" size={19} /></Link>
            <a className="secondaryButton" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" size={19} /> WhatsApp</a>
          </div>
          <div className="trustRow">
            <span><BadgeCheck aria-hidden="true" /><b>Precios registrados</b><small>En soles</small></span>
            <span><MapPin aria-hidden="true" /><b>Tienda física</b><small>{siteConfig.address}</small></span>
          </div>
        </div>
        <div className="heroShowcase" aria-label="Productos destacados de Tiendas Carlos">
          <div className="heroShape" />
          {heroProducts.map((product, index) => (
            <Link className={`heroProduct heroProduct${index + 1}`} href={`/producto/${product.slug}`} key={product.id}>
              <Image
                src={product.cardImage}
                alt={product.name}
                width={product.cardWidth}
                height={product.cardHeight}
                sizes={index === 0 ? "(max-width: 900px) 65vw, 30vw" : "(max-width: 900px) 32vw, 15vw"}
                unoptimized
                preload={index === 0}
              />
              <span><small>{product.name}</small><strong>{formatPrice(product.price)}</strong></span>
            </Link>
          ))}
          <div className="heroSeal"><Sparkles aria-hidden="true" /><strong>{products.length}</strong><span>productos</span></div>
        </div>
      </section>

      <section className="categorySection" id="categorias">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow"><i /> Explora por categoría</span>
            <h2>Todo lo que tu casa necesita</h2>
          </div>
          <Link className="textLink" href="/productos">Ver catálogo completo <ArrowRight aria-hidden="true" size={18} /></Link>
        </div>
        <div className="categoryGrid">
          {categories.map((category, index) => (
            <Link href={`/categoria/${category.slug}`} className={`categoryCard categoryTone${(index % 4) + 1}`} key={category.slug}>
              <span className="categoryNumber">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{category.name}</h3><p>{category.count} productos</p></div>
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="featuredSection">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow"><i /> Para empezar</span>
            <h2>Productos destacados</h2>
          </div>
          <p>Una muestra de la variedad que encontrarás en Tiendas Carlos.</p>
        </div>
        <div className="productGrid">{featured.map((product) => <ProductCard product={product} key={product.id} />)}</div>
        <div className="centerAction"><Link className="primaryButton" href="/productos">Explorar todos los productos <ArrowRight aria-hidden="true" /></Link></div>
      </section>

      <StoreSection />

      <section className="contactBand">
        <div>
          <span className="eyebrow eyebrowLight"><i /> Atención directa</span>
          <h2>¿Encontraste algo que te gusta?</h2>
          <p>Escríbenos con el nombre o código del producto y te ayudamos.</p>
        </div>
        <div className="contactActions">
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> WhatsApp {siteConfig.phoneDisplay}</a>
          <a href={siteConfig.phoneHref}><Phone aria-hidden="true" /> Llamar a la tienda</a>
        </div>
      </section>
    </main>
  );
}

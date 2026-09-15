import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";

export function Header() {
  return (
    <>
      <div className="topbar">
        <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin aria-hidden="true" size={14} /> {siteConfig.address}
        </a>
        <span>Precios claros · Atención directa</span>
        <a href={siteConfig.phoneHref}>
          <Phone aria-hidden="true" size={14} /> {siteConfig.phoneDisplay}
        </a>
      </div>
      <header className="siteHeader">
        <Link className="brand" href="/" aria-label="Tiendas Carlos, inicio">
          <Image
            src="/brand/logo.webp"
            alt="Tiendas Carlos, la tienda del hogar"
            width={584}
            height={260}
            unoptimized
            preload
          />
        </Link>
        <nav aria-label="Navegación principal">
          <Link href="/productos">Productos</Link>
          <Link href="/#categorias">Categorías</Link>
          <Link href="/#tienda">Nuestra tienda</Link>
          <Link href="/#ubicacion">Ubicación</Link>
        </nav>
        <a className="headerWhatsApp" href={whatsappUrl()} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" size={18} />
          <span>WhatsApp</span>
        </a>
      </header>
    </>
  );
}

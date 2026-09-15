import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig, whatsappUrl } from "@/config/site";

export function Footer() {
  return (
    <footer className="footer" id="ubicacion">
      <div className="footerMain">
        <div className="footerBrand">
          <Image src="/brand/logo.webp" alt="Tiendas Carlos" width={584} height={260} unoptimized />
          <p>Productos útiles para hacer de tu casa un hogar.</p>
        </div>
        <div>
          <h2>Explora</h2>
          <Link href="/productos">Todos los productos</Link>
          <Link href="/#categorias">Categorías</Link>
          <Link href="/#tienda">Conoce la tienda</Link>
        </div>
        <div>
          <h2>Encuéntranos</h2>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" size={18} /> {siteConfig.address}
          </a>
          <a href={siteConfig.phoneHref}>
            <Phone aria-hidden="true" size={18} /> {siteConfig.phoneDisplay}
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" size={18} /> Escribir por WhatsApp
          </a>
        </div>
      </div>
      <div className="footerBottom">
        <span>© {new Date().getFullYear()} Tiendas Carlos</span>
        <span>La tienda del hogar</span>
      </div>
    </footer>
  );
}

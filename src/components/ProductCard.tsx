import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { productWhatsAppMessage, whatsappUrl } from "@/config/site";

export function ProductCard({ product }: { product: Product }) {
  const message = productWhatsAppMessage(product.name, product.slug, formatPrice(product.price));

  return (
    <article className="productCard">
      <Link className="productImage" href={`/producto/${product.slug}`} aria-label={`Ver ${product.name}`}>
        <Image
          src={product.cardImage}
          alt={product.name}
          width={product.cardWidth}
          height={product.cardHeight}
          sizes="(max-width: 540px) 50vw, (max-width: 900px) 33vw, (max-width: 1280px) 25vw, 280px"
          unoptimized
        />
        {product.featured ? <span className="featuredBadge">Destacado</span> : null}
      </Link>
      <div className="productInfo">
        <Link className="productCategory" href={`/categoria/${product.categorySlug}`}>{product.category}</Link>
        <h3><Link href={`/producto/${product.slug}`}>{product.name}</Link></h3>
        {product.variants?.length ? (
          <p className="variantHint">{product.variants.map((item) => `${item.label}: ${formatPrice(item.price)}`).join(" · ")}</p>
        ) : null}
        <div className="productBottom">
          <div className="priceBlock">
            {product.variants?.length ? <small>Desde</small> : null}
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <a
            className="cardWhatsApp"
            href={whatsappUrl(message)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Consultar por ${product.name} en WhatsApp`}
          >
            <MessageCircle aria-hidden="true" size={18} />
          </a>
          <Link className="cardDetails" href={`/producto/${product.slug}`} aria-label={`Detalles de ${product.name}`}>
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}

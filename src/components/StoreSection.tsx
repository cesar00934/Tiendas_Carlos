import Image from "next/image";
import { MapPin, PlayCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const storeImages = [
  { src: "/store/tienda-carlos-4.webp", alt: "Licuadoras, hervidores y ollas arroceras en Tiendas Carlos" },
  { src: "/store/tienda-carlos-3.webp", alt: "Termos, botellas y tazas disponibles en Tiendas Carlos" },
  { src: "/store/tienda-carlos-2.webp", alt: "Cristalería, jarras, vasos y fuentes en Tiendas Carlos" },
];

export function StoreSection() {
  return (
    <section className="storeSection" id="tienda">
      <div className="sectionHeading storeHeading">
        <div>
          <span className="eyebrow eyebrowLight"><i /> Nuestra tienda</span>
          <h2>Mucho más por descubrir en persona</h2>
        </div>
        <p>Recorre nuestros pasillos y descubre la variedad que tenemos para cocina, dormitorio y organización.</p>
      </div>
      <div className="storeMedia">
        <div className="videoCard">
          <video
            controls
            playsInline
            preload="none"
            poster="/store/video-poster.webp"
            aria-label="Recorrido por el interior de Tiendas Carlos"
          >
            <source src="/store/recorrido-tiendas-carlos.mp4" type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
          <span className="videoLabel"><PlayCircle aria-hidden="true" size={18} /> Conoce la tienda por dentro</span>
        </div>
        <div className="storeGallery">
          {storeImages.map((item, index) => (
            <figure key={item.src} className={`storePhoto storePhoto${index + 1}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 800px) 50vw, 28vw" unoptimized />
            </figure>
          ))}
        </div>
      </div>
      <a className="storeAddress" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
        <MapPin aria-hidden="true" />
        <span><small>Visítanos en</small><strong>{siteConfig.address}</strong></span>
        <b>Cómo llegar →</b>
      </a>
    </section>
  );
}

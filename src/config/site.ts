export const siteConfig = {
  name: "Tiendas Carlos",
  tagline: "La tienda del hogar",
  description:
    "Productos para cocina, dormitorio, organización y todo tu hogar. Visítanos en Av. San Martín 744 o consulta por WhatsApp.",
  address: "Av. San Martín 744",
  phoneDisplay: "910 599 105",
  phoneE164: "+51910599105",
  phoneHref: "tel:+51910599105",
  whatsappBase: "https://wa.me/51910599105",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiendas-carlos.vercel.app",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Tiendas%20Carlos%20Av.%20San%20Mart%C3%ADn%20744",
} as const;

export function whatsappUrl(message?: string) {
  const text = message ?? "Hola Tiendas Carlos, quiero consultar por sus productos.";
  return `${siteConfig.whatsappBase}?text=${encodeURIComponent(text)}`;
}

export function productWhatsAppMessage(name: string, slug: string, formattedPrice: string) {
  const productUrl = new URL(`/producto/${slug}`, `${siteConfig.url}/`).toString();
  return `Hola Tiendas Carlos, quiero consultar por ${name} (${productUrl}), publicado a ${formattedPrice}.`;
}

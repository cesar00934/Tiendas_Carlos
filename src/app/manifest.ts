import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tiendas Carlos — La tienda del hogar",
    short_name: "Tiendas Carlos",
    description: "Catálogo de productos para el hogar en Av. San Martín 744.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf6",
    theme_color: "#f5b91f",
    lang: "es-PE",
    icons: [
      { src: "/brand/mark-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
  };
}

# Tiendas Carlos

Catálogo web de productos para el hogar de Tiendas Carlos, ubicada en Av. San Martín 744.

## Desarrollo local

```bash
npm install
npm run dev
```

La página estará disponible en `http://localhost:3000`.

## Publicación

1. Sube este proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Configura `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.
4. Cuando Google Search Console entregue el código de verificación, configúralo en `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.

El proyecto ya incluye sitemap, robots, metadatos, datos estructurados de la tienda y los productos, favicon, imágenes WebP, carga diferida del catálogo y video optimizado.

## Catálogo

Las imágenes visibles están preoptimizadas en dos tamaños dentro de `public/catalog`. La pantalla carga inicialmente 24 productos y descarga las demás imágenes bajo demanda, por lo que el catálogo puede seguir creciendo sin cargar todas las fotos al abrir la página.


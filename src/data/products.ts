import assetsData from "./catalog-assets.json";
import catalogA from "./catalog-a.json";
import catalogB from "./catalog-b.json";
import catalogC from "./catalog-c.json";
import catalogD from "./catalog-d.json";
import catalogE from "./catalog-e.json";
import catalogF from "./catalog-f.json";
import catalogG from "./catalog-g.json";
import catalogH from "./catalog-h.json";
import type { Product } from "./types";

type CatalogVariant = { label: string; price?: number };
type CatalogLabel = {
  index: number;
  sourceFile?: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  variants?: CatalogVariant[];
};

type CatalogAsset = {
  id: string;
  index: number;
  sourceFile: string;
  cardImage: string;
  largeImage: string;
  cardWidth: number;
  cardHeight: number;
  largeWidth: number;
  largeHeight: number;
};

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const featuredIndexes = new Set([
  1, 19, 23, 43, 46, 53, 60, 79, 84, 108, 121, 129, 149, 158,
  187, 201, 243, 246, 272, 273, 283, 346, 379, 385, 433, 442, 447,
  449, 460, 461, 481, 501, 503, 506, 520,
]);

const labels = [
  ...catalogA,
  ...catalogB,
  ...catalogC,
  ...catalogD,
  ...catalogE,
  ...catalogF,
  ...catalogG,
  ...catalogH,
] as CatalogLabel[];
const assets = assetsData as CatalogAsset[];

if (labels.length !== assets.length) {
  throw new Error(`Catálogo inconsistente: ${labels.length} productos y ${assets.length} imágenes.`);
}

const assetByIndex = new Map(assets.map((asset) => [asset.index, asset]));

export const products: Product[] = labels.map((label) => {
  const asset = assetByIndex.get(label.index);
  if (!asset || (label.sourceFile && asset.sourceFile !== label.sourceFile)) {
    throw new Error(`Imagen no encontrada o desordenada para el producto ${label.index}: ${label.sourceFile ?? "sin archivo"}`);
  }

  return {
    ...asset,
    name: label.name,
    slug: `${slugify(label.name)}-${asset.id}`,
    category: label.category,
    categorySlug: slugify(label.category),
    description: label.description ?? `${label.name} disponible en Tiendas Carlos.`,
    price: label.price,
    variants: label.variants?.map((variant) => ({
      label: variant.label,
      price: variant.price ?? label.price,
    })),
    featured: featuredIndexes.has(label.index),
  };
});

export const categories = Array.from(new Set(products.map((product) => product.category)))
  .sort((a, b) => a.localeCompare(b, "es"))
  .map((name) => ({
    name,
    slug: slugify(name),
    count: products.filter((product) => product.category === name).length,
  }));

export const minimumCatalogPrice = Math.min(...products.map((product) => product.price));
export const maximumCatalogPrice = Math.max(
  ...products.flatMap((product) => [product.price, ...(product.variants?.map((variant) => variant.price) ?? [])]),
);

export type ProductVariant = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  price: number;
  variants?: ProductVariant[];
  cardImage: string;
  largeImage: string;
  cardWidth: number;
  cardHeight: number;
  largeWidth: number;
  largeHeight: number;
  sourceFile: string;
  featured?: boolean;
};

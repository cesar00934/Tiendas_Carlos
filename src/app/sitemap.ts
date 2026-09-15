import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/productos`, changeFrequency: "weekly", priority: 0.9 },
  ];
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteConfig.url}/categoria/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/producto/${product.slug}`,
    changeFrequency: "weekly",
    priority: product.featured ? 0.8 : 0.7,
    images: [`${siteConfig.url}${product.largeImage}`],
  }));
  return [...staticPages, ...categoryPages, ...productPages];
}

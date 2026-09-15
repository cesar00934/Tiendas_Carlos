"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "@/data/types";
import { normalizeSearch } from "@/lib/format";
import { ProductCard } from "./ProductCard";

const PAGE_SIZE = 24;

type CatalogExplorerProps = {
  products: Product[];
  initialCategory?: string;
  initialQuery?: string;
  compactHeading?: boolean;
};

export function CatalogExplorer({ products, initialCategory = "Todas", initialQuery = "", compactHeading = false }: CatalogExplorerProps) {
  const categories = useMemo(
    () => ["Todas", ...Array.from(new Set(products.map((product) => product.category))).sort((a, b) => a.localeCompare(b, "es"))],
    [products],
  );
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const needle = normalizeSearch(query);
    const min = minimum === "" ? Number.NEGATIVE_INFINITY : Number(minimum);
    const max = maximum === "" ? Number.POSITIVE_INFINITY : Number(maximum);
    const matches = products.filter((product) => {
      const searchable = normalizeSearch(`${product.name} ${product.category} ${product.description} ${product.variants?.map((item) => item.label).join(" ") ?? ""}`);
      const variantPrices = product.variants?.map((item) => item.price) ?? [product.price];
      return (
        (!needle || searchable.includes(needle)) &&
        (category === "Todas" || product.category === category) &&
        variantPrices.some((price) => price >= min && price <= max)
      );
    });

    return [...matches].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name, "es");
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.id.localeCompare(b.id);
    });
  }, [products, query, category, minimum, maximum, sort]);

  function reset() {
    setQuery("");
    setCategory(initialCategory);
    setMinimum("");
    setMaximum("");
    setSort("featured");
    setVisible(PAGE_SIZE);
  }

  const hasFilters = query || category !== initialCategory || minimum || maximum || sort !== "featured";
  const visibleProducts = filtered.slice(0, visible);

  return (
    <section className={`catalogExplorer ${compactHeading ? "catalogExplorerCompact" : ""}`} aria-labelledby="catalog-title">
      {!compactHeading ? (
        <div className="sectionHeading catalogHeading">
          <div>
            <span className="eyebrow"><i /> Catálogo</span>
            <h1 id="catalog-title">Encuentra justo lo que buscas</h1>
          </div>
          <p>Busca por producto, categoría o rango de precio. Todos los valores están expresados en soles.</p>
        </div>
      ) : <h2 className="srOnly" id="catalog-title">Catálogo de productos</h2>}

      <div className="catalogTools">
        <label className="searchField">
          <Search aria-hidden="true" size={20} />
          <span className="srOnly">Buscar productos</span>
          <input
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setVisible(PAGE_SIZE); }}
            placeholder="Busca: olla, silla, colcha…"
          />
          {query ? <button type="button" onClick={() => setQuery("")} aria-label="Borrar búsqueda"><X size={18} /></button> : null}
        </label>
        <label className="toolField">
          <SlidersHorizontal aria-hidden="true" size={17} />
          <span className="srOnly">Ordenar productos</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Recomendados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="name">Nombre A–Z</option>
          </select>
        </label>
        <label className="priceField">
          <span>S/</span>
          <input inputMode="decimal" type="number" min="0" step="0.5" value={minimum} onChange={(event) => { setMinimum(event.target.value); setVisible(PAGE_SIZE); }} placeholder="Mín." aria-label="Precio mínimo" />
        </label>
        <label className="priceField">
          <span>S/</span>
          <input inputMode="decimal" type="number" min="0" step="0.5" value={maximum} onChange={(event) => { setMaximum(event.target.value); setVisible(PAGE_SIZE); }} placeholder="Máx." aria-label="Precio máximo" />
        </label>
      </div>

      <div className="categoryRail" aria-label="Filtrar por categoría">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={category === item ? "active" : ""}
            aria-pressed={category === item}
            onClick={() => { setCategory(item); setVisible(PAGE_SIZE); }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="resultsBar" aria-live="polite">
        <strong>{filtered.length} {filtered.length === 1 ? "producto" : "productos"}</strong>
        {hasFilters ? <button type="button" onClick={reset}>Limpiar filtros <X size={15} /></button> : <span>Precios en soles</span>}
      </div>

      {visibleProducts.length ? (
        <>
          <div className="productGrid">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          {visible < filtered.length ? (
            <div className="loadMore">
              <button type="button" onClick={() => setVisible((current) => current + PAGE_SIZE)}>
                Ver más productos <span>{Math.min(PAGE_SIZE, filtered.length - visible)} más</span>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="emptyState">
          <Search aria-hidden="true" size={30} />
          <h2>No encontramos coincidencias</h2>
          <p>Prueba con otra palabra o elimina los filtros de precio.</p>
          <button type="button" onClick={reset}>Ver todo el catálogo</button>
        </div>
      )}
    </section>
  );
}

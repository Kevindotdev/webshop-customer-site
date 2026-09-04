import type { ProductsResponse } from "./types";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home() {
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}&_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <Hero />

        <h2 className="mt-8 text-lg font-semibold">
          Products
        </h2>

        <div>
          {products.map((product) => (
            <h2 key={product.id}>
              {product.title} - {product.category?.name}
            </h2>
          ))}
        </div>
      </main>
    </>
  );
}
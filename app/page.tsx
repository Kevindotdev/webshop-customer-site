import ProductService from "@/services/product-service";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CategoryList } from "@/components/category-list";
import { ProductGrid } from "@/components/products-grid";
import { ServiceBenefits } from "@/components/service-benefits";

export default async function Home() {
  const { products } = await ProductService.getProducts();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <Hero />

        <CategoryList />

        <section id="products" className="mt-10">
          <h2 className="text-lg font-semibold">
            Populära produkter
          </h2>

          <div className="mt-4">
            <ProductGrid products={products} />
          </div>
        </section>

        <ServiceBenefits />
      </main>
    </>
  );
}
import ProductService from "@/services/product-service";
import { Hero } from "@/components/hero";
import { CategoryList } from "@/components/category-list";
import { ProductGrid } from "@/components/products-grid";
import { ServiceBenefits } from "@/components/service-benefits";
import { CategorySidebar } from "@/components/category-sidebar";
import CategoryService from "@/services/category-service";

export default async function Home() {
  const { products } = await ProductService.getProducts();
  const categories = await CategoryService.getAllCategories();

  return (
    <div className="relative mx-auto max-w-7xl">
      <CategorySidebar categories={categories} />

      <main className="px-6 py-6">
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

      </main>
    </div>
  );
}
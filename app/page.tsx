import CategoryService from "@/services/category-service";
import ProductService from "@/services/product-service";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { CategoryList } from "@/components/category-list";


export default async function Home() {
  const { products } = await ProductService.getProducts();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-6">
        <Hero />

        <CategoryList />

        {/* Products */}
      </main>
    </>
  );
}
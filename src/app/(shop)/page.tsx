export const revalidate = 60; //the page is revalidated every minute

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page: number; take: number }>;
}

export default async function Home({ searchParams }: Props) {
  const { page, take } = await searchParams;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, take });

  if (products.length === 0) {
    redirect("/");
  }
  console.log(products);
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <div className="mt-10">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

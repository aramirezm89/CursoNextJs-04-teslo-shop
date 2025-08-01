import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";


interface Props {
  searchParams: Promise<{ page: number; take: number }>;
}

export default async function Home({ searchParams }: Props) {
  const { page, take } = await searchParams;

  const { products,currentPage, totalPages} = await getPaginatedProductsWithImages({ page, take });

  if(products.length === 0){
    redirect('/')
  }
  console.log(products);
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <Pagination  totalPages={totalPages}/>
    </>
  );
}

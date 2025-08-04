export const revalidate = 60; 
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";

interface CategoryProps {
  params: Promise<{ gender: Gender }>;
  searchParams: Promise<{ page: number; take: number }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryProps) {
  const { gender } = await params;
  const { page, take } = await searchParams;

  /*   if(id==='kid'){
    notFound();
  } */

  const labels: Record<Gender, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "todos",
  };

  const { products, totalPages } = await getPaginatedProductsWithImages({
    gender,
    page,
    take,
  });

  return (
    <>
      <Title
        title={`Productos de ${labels[gender]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
      <div className="mt-10">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

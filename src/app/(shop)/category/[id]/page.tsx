
import { getInitialData } from "@/app/helpers/product-helper";
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";

interface CategoryProps {
  params: Promise<{ id: Category }>;
}

export default async function CategoryPage({ params }: CategoryProps) {
  const { id } = await params;

  /*   if(id==='kid'){
    notFound();
  } */

  const labels : Record<Category,string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex : "todos"
  };

  const data = getInitialData(id);

  return (
    <>
      <Title
        title={`Productos de ${labels[id]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={data} />
    </>
  );
}

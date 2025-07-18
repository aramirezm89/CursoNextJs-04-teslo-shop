import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";


const data = initialData.products;

export default function Home() {
  return (
   <>
    <Title title="Tienda" subtitle="Todos los productos"/>
    <ProductGrid products={data}/>
   </>
  );
}

import { getPaginatedProductsWithImages } from "@/actions";
import { Title } from "@/components";

import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import { ProductsTable } from "./ui/ProductsTable";

interface Props {
  searchParams: Promise<{ page: number; take: number }>;
}
export default async function ProductsPage({ searchParams }: Props) {
  const { page, take } = await searchParams;
 const {  products = [], totalPages } =     await getPaginatedProductsWithImages({ page, take });



  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
       <div className="flex items-center gap-2">
        <IoCardOutline size={20} /> Agregar producto
       </div>
        </Link>
      </div>

      <div className="mb-10">
        <ProductsTable products={products} totalPages={totalPages} />
       
      </div>
    </>
  );
}

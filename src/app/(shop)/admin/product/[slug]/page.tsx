import { getProductBySlug } from "@/actions";
import { getCategoriesAdmin } from "@/actions/admin/categories";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, { ok, categories = [] }] = await Promise.all([
    getProductBySlug(slug),
    getCategoriesAdmin(),
  ]);

  //todo: new

  if (!product) {
    redirect("/admin/products");
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar producto";
  return (
    <div>
      <Title title={title} />
      <ProductForm product={product} categories={categories} />
    </div>
  );
}

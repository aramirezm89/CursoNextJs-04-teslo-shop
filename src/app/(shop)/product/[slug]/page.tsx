import { getInStockProduct, getProductBySlug } from "@/actions";
import { ProductSlideShow, ProductSlideShowMobile } from "@/components";
import { AddToCart } from "@/components/product/add-cart/AddToCart";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  /*   const previousImages = (await parent).openGraph?.images || []; */
  return {
    title: product?.title ?? "Producto no encontrado",
    description: `${product?.description ?? ""}`,
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: `${product?.description ?? ""}`,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const stock = await getInStockProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*   slideShow */}

      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow images={product.images.map((image) => image.url)} />
        <ProductSlideShowMobile images={product.images.map((image) => image.url)} />
      </div>

      {/*        details */}

      <div className="col-span-1 px-5 flex flex-col items-start justify-start">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg">${Number(product.price).toFixed(2)}</p>

        {/*   selector tallas */}

        {/*   selector cantidad */}

        {/*  button */}

        <AddToCart product={product} stock={stock} />

        {/*     descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light text-sm pb-3">{product.description}</p>
      </div>
    </div>
  );
}

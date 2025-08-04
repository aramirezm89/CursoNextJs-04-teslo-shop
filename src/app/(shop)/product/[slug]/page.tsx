import { getInStockProduct, getProductBySlug } from "@/actions";
import {
  ProductSlideShow,
  ProductSlideShowMobile,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { StockLabel } from "@/components/product/stock-label/StockLabel";
import { titleFont } from "@/config";
import clsx from "clsx";
import { notFound } from "next/navigation";

interface ProductProps {
  params: Promise<{ slug: string }>;
}
export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const stock = await getInStockProduct(slug);
console.log(stock === 0)
  if (!product) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*   slideShow */}

      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow images={product.images} />
        <ProductSlideShowMobile images={product.images} />
      </div>

      {/*        details */}

      <div className="col-span-1 px-5 flex flex-col items-start justify-start">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg">${Number(product!.price).toFixed(2)}</p>

        {/*   selector tallas */}

        <SizeSelector
          availableSizes={product.sizes}
          seletedSize={product.sizes[0]}
        />

        {/*   selector cantidad */}
        <QuantitySelector quantity={2} />

        {/*  button */}
        <button
          disabled={stock === 0}
          className={clsx(
            "bg-blue-600 hover:bg-blue-800 py-2 px-4 rounded transition-all my-5 cursor-pointer",
            !stock
              ? "pointer-events-none bg-transparent text-black"
              : "text-white "
          )}
        >
          {!stock ? "Producto agotado" : " Agregar al carrito"}
        </button>

        {/*     descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light text-sm pb-3">{product!.description}</p>
      </div>
    </div>
  );
}

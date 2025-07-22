
import { getProductBySlug } from "@/app/helpers/product-helper";
import { ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config";

interface CategoryProps {
  params: Promise<{ slug: string }>;
}
export default async function ProductPage({ params }: CategoryProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*   slideShow */}

      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow images={product!.images} />
      </div>

      {/*        details */}

      <div className="col-span-1 px-5 flex flex-col items-start justify-center">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product!.title}
        </h1>
        <p className="text-lg">${Number(product!.price).toFixed(2)}</p>

        {/*   selector tallas */}

        <SizeSelector
          availableSizes={product!.sizes}
          seletedSize={product!.sizes[0]}
        />

        {/*   selector cantidad */}
        <QuantitySelector quantity={2} />

        {/*  button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/*     descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light text-sm">{product!.description}</p>
      </div>
    </div>
  );
}

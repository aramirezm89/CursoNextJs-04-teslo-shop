'use client'

import { CartProduct, Product, Size } from '@/interfaces'
import clsx from 'clsx'
import { QuantitySelector } from '../quantity-selector/QuantitySelector'
import { SizeSelector } from '../size-selector/SizeSelector'
import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'




interface Props{
  
    stock: number
   product : Product

}
export const AddToCart = ({product,stock} : Props) => {

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted ] = useState(false);
  const cartStore = useCartStore();

  //add product to cartStore
  const addToCart = () =>{
    setPosted(true)
    if(!size) return;

    const {title,id,price,slug,images} = product;
    const productToCart : CartProduct = {
      id,
      title,
      slug,
      price,
      image : images[0],
      quantity,
      size
    }
  
    cartStore.addProductToCart(productToCart)
    setPosted(false)
    setQuantity(1);
    setSize(undefined)
  }



  return (
    <>
      {!size && posted && <p className='text-red-500 mt-2'>Selecciona una talla para tu producto.</p>}
      <SizeSelector
        availableSizes={product.sizes}
        seletedSize={size}
        onSizeValueChanged={setSize}
      />

      {/*   selector cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/*  button */}
      <button
        onClick={addToCart}
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
    </>
  );
}

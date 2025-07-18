import { ProductCard } from '@/components/product/product-card/ProductCard'
import { Product } from '@/interfaces'
import React from 'react'


interface Props{

    products : Product[]
}
export const ProductGrid = ({products} : Props) => {
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-15'>
            {
                products.map((p) =>(
                    <ProductCard key={p.slug} product={p}/>
                ))
            }
    </div>
  )
}

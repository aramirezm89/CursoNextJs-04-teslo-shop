'use client'
import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


interface Props{
    product : Product
}
export const ProductCard = ({product} : Props) => {

    const [displayimage, setdisplayimage] = useState(product.images[0])
    const changeImage = (imageIndex : number = 0) =>{
        setdisplayimage(product.images[imageIndex])
    }
    
  return (
    <div className="w-full flex flex-col justify-start">
      <figure>
        <Image
          className="w-full object-cover rounded"
          src={`/products/${displayimage}`}
          width={100}
          height={100}
          alt={product.title}
          onMouseOver={() => changeImage(1)}
          onMouseLeave={() => changeImage(0)}

        />
      </figure>
      <div className="flex flex-col justify-start">
        <Link href={`product/${product.slug}`} className="font-extrabold text-sm">{product.title}</Link>
        <p className="font-extrabold text-sm">${product.price}</p>
      </div>
    </div>
  );
}

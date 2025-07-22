'use client'
import React, { useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';


interface Props{
    quantity: number;
}
export const QuantitySelector = ({ quantity }: Props) => {
    const [count, setCount] = useState(quantity)

    const increment = () =>{
        setCount(count + 1);
    }

    const decrement = () =>{
        if(count === 1) return;
        setCount(count - 1);
    }
  return (
    <div>
      <h3 className="font-bold mb-4">Cantidad</h3>
      <div className="flex  items-center justify-center ">
        <button className="cursor-pointer hover:bg-gray-200 rounded" onClick={decrement}>
          <IoRemoveCircleOutline size={30} />
        </button>
        <span className="w-20 mx-3 text-center h-full px-5 py-1 bg-gray-200 rounded">
          {count}
        </span>
        <button
          className="cursor-pointer hover:bg-gray-200 rounded"
          onClick={increment}
        >
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
}

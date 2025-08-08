'use client'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';


interface Props {
  quantity: number;
  onQuantityChange : (count:number) => void;
}
export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  

    const increment = () =>{

        onQuantityChange(quantity +  1)
    }

    const decrement = () =>{
        if(quantity === 1) return;
       
            onQuantityChange(quantity - 1);
    }
  return (
    <div>
      <h3 className="font-bold mb-4">Cantidad</h3>
      <div className="flex  items-center justify-center ">
        <button className="cursor-pointer hover:bg-gray-200 rounded" onClick={decrement}>
          <IoRemoveCircleOutline size={30} />
        </button>
        <span className="w-20 mx-3 text-center h-full px-5 py-1 bg-gray-200 rounded">
          {quantity}
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

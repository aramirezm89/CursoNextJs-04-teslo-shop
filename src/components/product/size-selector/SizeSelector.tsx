import { Size } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  availableSizes: Size[];
  seletedSize?: Size;
  onSizeValueChanged: (size: Size) => void;
}
export const SizeSelector = ({
  availableSizes,
  seletedSize,
  onSizeValueChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex gap-2">
        {availableSizes.map((size) => (
          <button
            onClick={() => onSizeValueChanged(size)}
            className={clsx("cursor-pointer hover:underline text-lg", {
              underline: seletedSize === size,
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

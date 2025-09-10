import Image from "next/image";
import React from "react";

interface Props {
  src?: string;
  alt: string;
  className?: React.HtmlHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  style?: React.CSSProperties;
}

export const ProductImage = ({ src, alt, className, width, height, style }: Props) => {
  let localSrcImage: string;

  if (!src) {
    // No hay src, usar placeholder
    localSrcImage = "/imgs/placeholder.jpg";
  } else if (src.startsWith("http")) {
    // Es una URL externa, usar tal como viene
    localSrcImage = src;
  } else {
    // Es un archivo local, agregar prefijo
    localSrcImage = `/products/${src}`;
  }
  return (
    <Image
      className={className}
      src={localSrcImage}
      alt={alt}
      width={width}
      height={height}
      style={style}
    />
  );
};

export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // type: Type;
  categorie: Category;
  gender: Gender;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Category = "shirts" | "pants" | "hoodies" | "hats";
export type Gender = "men" | "women" | "kid" | "unisex";

import { initialData } from "@/seed/seed";

export const getInitialData = (category: string) => {
  const data = initialData.products.filter((p) => p.gender === category);

  return data;
};

export const getProductBySlug = (slug : string) =>{
    return initialData.products.find((p) => p.slug === slug);
}

import prisma from "../../../lib/prisma";

export const getCategoriesAdmin = async () => {
 try {
    const categories = await prisma.category.findMany({});

    if (!categories) {
     return{
      ok: false,
      message: "Error al obtener las categorías"
     }
    }
  
    return {
      ok: true,
      categories
    };
    
 } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al obtener las categorías"
    }
 }
};

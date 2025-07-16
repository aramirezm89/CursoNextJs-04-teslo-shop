

interface CategoryProps{
params : Promise<{id:string}>
}
export default async function CategoryPage({params}: CategoryProps) {
  const {id} = await params;


  return (
    <div>
      <h1>Hello category page {id}</h1>
    </div>
  );
}
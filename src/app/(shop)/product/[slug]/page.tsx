

interface CategoryProps{
params : Promise<{slug:string}>
}
export default async function CategoryPage({params}: CategoryProps) {
  const {slug} = await params;


  return (
    <div>
      <h1>Hello category page {slug}</h1>
    </div>
  );
}
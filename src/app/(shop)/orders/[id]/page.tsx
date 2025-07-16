

interface CategoryProps{
params : Promise<{id:string}>
}
export default async function OrderPage({params}: CategoryProps) {
  const {id} = await params;


  return (
    <div>
      <h1>Hello order page {id}</h1>
    </div>
  );
}
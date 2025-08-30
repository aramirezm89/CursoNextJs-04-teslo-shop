import { Title } from "@/components";
import { AdressForm } from "./ui/AdressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth";

export const metadata = {
  title: "CheckOut",
  description: "CheckOut",
};
export default async function AddressPage() {
  const session = await auth();
  const countries = await getCountries();
  const userStoredAddress = await getUserAddress(session!.user.id);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AdressForm
          countries={countries}
          userStoredAddress={userStoredAddress?.userAddress}
        />
      </div>
    </div>
  );
}

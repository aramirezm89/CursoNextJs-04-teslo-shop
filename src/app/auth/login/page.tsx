import { titleFont } from "@/config";
export default function LoginPage() {
  return (
    <div className=" grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className={titleFont.className}>Auth </h1>
    </div>
  );
}

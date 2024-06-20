
import MobileTab from "./Product/mobileTab";
import AllProduct from "./Product/allProduct";
import JewellryPage from "./Product/jewellry";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      {/* <div className="bg-gray-100 px-4 py-2 md:py-3 mt-2 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl mx-auto"> */}

      {/* AllProduct Component */}
      <AllProduct />

      {/* MobileTab Component */}
      <MobileTab />

      {/* JewellryPage Component */}
      <JewellryPage />
      {/* </div> */}
    </main>
  );
}

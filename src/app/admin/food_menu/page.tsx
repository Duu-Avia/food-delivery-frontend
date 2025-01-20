import Image from "next/image";
import { FoodCategory } from "../../_components/Food-category";
import FoodPage from "./[id]/page";
import { AllDishes } from "@/app/_components/All-dishes";

export default function Home() {
  return (
    <div className="relative flex w-full flex-col overflow-scroll">
      <FoodCategory />
      <AllDishes />
    </div>
  );
}

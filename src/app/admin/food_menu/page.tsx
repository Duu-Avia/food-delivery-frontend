import Image from "next/image";
import { FoodCategory } from "../../_components/Food-category";
import { Food } from "@/app/_components/Food";

export default function Home() {
  return (
    <div className="relative">
      <FoodCategory />
      <Food />
    </div>
  );
}

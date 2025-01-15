import Image from "next/image";
import { FoodCategory } from "./_components/Food-category";
import { CategoryAdd } from "./_components/Category-add";

export default function Home() {
  return (
    <div className="relative">
      <FoodCategory />
    </div>
  );
}

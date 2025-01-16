import Image from "next/image";
import { FoodCategory } from "../../_components/Food-category";
import FoodPage from "./[id]/page";


export default function Home() {
  return (
    <div className="relative">
     
      <FoodPage/>
    </div>
  );
}

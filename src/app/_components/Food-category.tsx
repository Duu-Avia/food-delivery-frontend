"use client";
import { Button } from "@/components/ui/button";
import { METHODS } from "http";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryAdd } from "./Category-add";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export type foodCategoriesType = {
  _id: number;
  name: string;
};

export const FoodCategory = () => {
  const [foodCategories, setFoodCategories] = useState<foodCategoriesType[]>([]);
  const [inputValue, setInputValue] = useState();
  const [categoryCategory, setCategoryCategory] = useState([]);
  const addFoodCategory = async () => {
    const response = await fetch(`http://localhost:8000/admin/food_menu`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputValue }),
    });
    const data = await response.json();
    setFoodCategories([...foodCategories, data.newItem]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/admin/food_menu`);
      const data = await response.json();
      setFoodCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#FFFFFF] w-full h-100% rounded-xl p-4 mt-[80px] mb-[50px]">
      <div className="py-3 text-[#09090B] text-[20px] font-[600]">Dishes category</div>
      <div className="flex flex-wrap gap-2">
        <Link href={"/admin/food_menu"}>
          <Badge className="rounded-full py-2 px-3 " variant={"outline"}>
            All dishes
          </Badge>
        </Link>
        {foodCategories.map((items: any) => (
          <Link key={`link-${items._id}`} href={`/admin/food_menu/food/${items?._id}`}>
            <Badge key={`category-${items?._id}`} className="rounded-full py-2 px-3 " variant="outline">
              <p className="text-[#18181B] text-[14px] font-[500] ">{items?.categoryName}</p>
            </Badge>
          </Link>
        ))}
        <CategoryAdd addFoodCategory={addFoodCategory} setInputValue={setInputValue} inputValue={inputValue} />
      </div>
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  foodCategoriesType,
  FoodCategory,
} from "@/app/_components/Food-category";
import { FoodCard } from "@/app/_components/Food-card";
import { FoodAdd } from "@/app/_components/Food-add";

type foodTypes = {
  _id: Number;
  foodName: String;
  price: Number;
  image: String;
  ingredients: String;
  category: String;
};

export default function FoodPage() {
  const { id } = useParams();
  const [foods, setFoods] = useState<foodTypes[]>([]);
  const [categoryData, setCategoryData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/dishes/${id}`
      );
      const data = await response.json();
      setFoods(data);
    };
    const fetchCategory = async () => {
      const response = await fetch(`http://localhost:8000/food_category`);
      const data = await response.json();
      setCategoryData(data);
    };
    fetchCategory();
    fetchData();
  }, []);
  console.log(foods)
console.log(id)
  return (
    <>
      <FoodCategory />
      <div className="bg-[#FFFFFF] w-full h-100% rounded-xl p-4">
        <div className="text-[#09090B] text-[1.25rem] font-[600] pb-[7px]">
          {
            categoryData?.find((category: any) => category._id == id)
              .categoryName
          }
        </div>
        <div className="flex gap-3 items-center">
          <FoodAdd itemsID={id} />
          <FoodCard itemsID={id}  />
        </div>
      </div>
    </>
  );
}

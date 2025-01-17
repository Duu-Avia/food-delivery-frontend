"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FoodCategory } from "@/app/_components/Food-category";
import { FoodCard } from "@/app/_components/Food-card";

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
  // const filteredFoods = foods.filter((food) => food.category === id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/admin/food_menu/food/${id}`
      );
      const data = await response.json();
      setFoods(data);
    };
    const fetchCategory = async () => {
      const response = await fetch(`http://localhost:8000/admin/food_menu`);
      const data = await response.json();
      setCategoryData(data);
    };
    fetchCategory();
    fetchData();
  }, []);

  return (
    <>
      <FoodCategory />

      <div className="bg-[#FFFFFF] w-full h-100% rounded-xl p-4 mt-[80px] mb-[50px]">
        <div className="text-[#09090B]">
          {categoryData?.find((category) => category._id == id).categoryName}
        </div>
        <FoodCard itemsID={id} />
      </div>
    </>
  );
}

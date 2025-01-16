"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FoodCategory } from "@/app/_components/Food-category";
import { FoodCard } from "@/app/_components/Food-card";

type foodTypes = {
  _id: Number,
  foodName: String,
  price: Number,
  image: String,
  ingredients: String,
  category: String,
};

export default function FoodPage(){
  const {id} = useParams()
  const [foods, setFoods] = useState<foodTypes[]>(
    []
  );
  const filteredFoods = foods.filter((food)=>food.category === id);

  // const addFoodCategory = async () => {
  //   const response = await fetch(`http://localhost:8000/admin/food_menu/food`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ name: inputValue }),
  //   });
  //   const data = await response.json();
  //   setFoodCategories([...foodCategories, data.newItem]);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/admin/food_menu/food`);
      const data = await response.json();
      setFoods(data);
    };
    fetchData();
  }, []);
 
  return (
    <>
    <FoodCategory/>
    <div className="bg-[#FFFFFF] w-full h-100% rounded-xl p-4 mt-[80px] mb-[50px]">
    <div className="ml-[10px] py-[10px]">Food</div>
    <FoodCard/>
    </div>
    </>
  )
  
};

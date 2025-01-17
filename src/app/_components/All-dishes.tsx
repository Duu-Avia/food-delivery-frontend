"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FoodCard } from "./Food-card";
import { FoodCategory } from "./Food-category";
import { FoodAdd } from "./Food-add";

export const AllDishes = () => {
  const { id } = useParams();
  const [foodCategories, setFoodCategories] = useState([]);
  //   const filteredFoods = foods.filter((food) => food.category === id);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/admin/food_menu/`);
      const data = await response.json();
      setFoodCategories(data);
    };
    fetchData();
  }, []);
  console.log(id);
  return (
    <>
      {foodCategories?.map((items?: any) => (
        <div
          key={`alldishes-${items?._id}`}
          className="bg-[#FFFFFF] w-full h-100% rounded-xl p-4 mt-[80px] mb-[50px]"
        >
          {items?.categoryName}
          <FoodCard itemsID={items?._id} />
        </div>
      ))}
    </>
  );
};

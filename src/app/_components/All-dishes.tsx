"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FoodCard } from "./Food-card";
import { FoodCategory } from "./Food-category";
import { FoodAdd } from "./Food-add";
import { useAuthFetchData } from "./Use-AuthFetchData";

export const AllDishes = () => {
const foodCategories = useAuthFetchData(`food_category`);


  return (
    <>
      {foodCategories?.map((items?: any) => (
        <div key={`alldishes-${items?._id}`} className=" bg-[#FFFFFF] w-full h-100% rounded-xl p-4 mt-[80px] mb-[50px]">
          <div className="text-[#09090B] text-[1.25rem] font-[600] pb-[7px]">{items?.categoryName}</div>
          <div className="flex gap-3 items-center">
            <FoodAdd itemsID={items?._id} />
            <FoodCard itemsID={items?._id} singleCategoryName={items?.categoryName} foodCategories={foodCategories} />
          </div>
        </div>
      ))}
    </>
  );
};

"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FoodCategory } from "@/app/_components/Food-category";

type foodTypes = {
  _id: Number,
  foodName: String,
  price: Number,
  image: String,
  ingredients: String,
  category: String,
};

export function FoodCard(){
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
 
  return (<>
        <div className="flex gap-5 p-2">
        {filteredFoods.map((food?:any)=>(
         <div className=" p-3 border-solid border-[1px] border-[#E4E4E7] rounded-lg w-[270px] h-[241px]" key={food?._id}>
         <div className="w-[238px] h-[129px]"></div>
         <div className="flex items-center justify-between"> 
         <div className="text-[1rem] text-[#EF4444] font-[500]">{food?.foodName}</div>
         <div className="text-[0.8rem] text-[#09090B] pl-[100px]">${food?.price}</div>
         </div>
         <div className="text-[#09090B] w-[100%]">{food?.ingredients}</div>

        </div>))}
      
        </div>
            
      </>
  )
  
};
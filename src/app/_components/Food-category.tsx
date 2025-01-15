"use client";
import { Button } from "@/components/ui/button";
import { METHODS } from "http";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryAdd } from "./Category-add";
import { Badge } from "@/components/ui/badge";
type foodCategoriesType = {
  _id: number;
  name: string;
};

export const FoodCategory = () => {
  const [foodCategories, setFoodCategories] = useState<foodCategoriesType[]>(
    []
  );
  const [inputValue, setInputValue] = useState();
  

  const addFoodCategory = async () => {
    const response = await fetch(`http://localhost:8000/food-category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputValue }),
    });
    const data = await response.json();
      setFoodCategories([...foodCategories, data.newItem]);
      
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/food-category`);
      const data = await response.json();
      setFoodCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#FFFFFF] w-full h-100% rounded-xl p-4 ">
      <div className="py-3 text-[#09090B] font-[600]">Dishes category</div>
      <div className="flex flex-wrap gap-2">
        {foodCategories.map((items: any) => (
          <Badge
            key={`category-${items?._id}`}
            className="rounded-full "
            variant="outline"
          >
            <p className="text-[#18181B] text-[14px] font-[500] ">
              {items?.categoryName}
            </p>
          </Badge>
        ))}

        <CategoryAdd
          addFoodCategory={addFoodCategory}
          setInputValue={setInputValue}
          inputValue={inputValue}
        />
      </div>
    </div>
  );
};

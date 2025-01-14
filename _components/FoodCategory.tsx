"use client";
import { METHODS } from "http";
import { useEffect, useState } from "react";

export const FoodCategory = () => {
  const [foodCategories, setFoodCategories] = useState([]);

  const addFoodCategory = async () => {
    const newCategoryName = prompt("Enter new name");
    const response = await fetch(`http://localhost:8000/food-category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName }),
    });
    const data = await response.json();
    setFoodCategories([...foodCategories, data.categoryName]);
    console.log(data);
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
    <div>
      <div>
        {foodCategories.map((items) => (
          <div key={items?._id}>{items?.categoryName}</div>
        ))}
        <button onClick={addFoodCategory} className="bg-gray-800">
          ADD
        </button>
      </div>
    </div>
  );
};

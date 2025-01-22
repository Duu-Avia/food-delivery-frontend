"use client";
import { useEffect, useState } from "react";
import { CategoryScroll } from "./Category-scroll";
import { HomeFoodContainer } from "./HomeFood-container";

export const HomeSection = () => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/home");
      const data = await response.json();
      setCategories(data);
    };
    const fetchFoods = async () => {
      const response = await fetch("http://localhost:8000/home/food");
      const data = await response.json();
      setFoods(data);
    };
    fetchFoods();
    fetchCategories();
  }, []);

  return (
    <>
      <img className="w-full" src="./homeLogo.png" alt="" />
      <div className="px-[90px] py-7">
        <div className="text-[1.9rem] text-[#FFFFFF] font-600">Categories</div>
        <CategoryScroll categoryData={categories} foodData={foods} />
      </div>
      <HomeFoodContainer categoryData={categories} foodData={foods} />
    </>
  );
};

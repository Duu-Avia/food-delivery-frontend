"use client";
import { useEffect, useState } from "react";
import { HomeFoodContainer } from "./HomeFood-container";
import { CategoryScroll } from "./Category-scroll";

type HomeSectionType = {
  orderLocation : string
}

export const HomeSection = ({ orderLocation }:HomeSectionType) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food_category`);
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <img className="w-full" src="./homeLogo.png" alt="" />
      <div className="px-[90px] py-7">
        <div className="text-[1.9rem] text-[#FFFFFF] font-600">Categories</div>
        <CategoryScroll categoryData={categories} />
      </div>
      <HomeFoodContainer categoryData={categories} orderLocation={orderLocation} />
    </>
  );
};

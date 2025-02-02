"use client";
import { useEffect, useState } from "react";

import { useParams, usePathname } from "next/navigation";
import { HomeHeader } from "@/app/_components/Home-header";
import { CategoryScroll } from "@/app/_components/Category-scroll";
import { HomeFoodCard } from "@/app/_components/HomeFood-card";
import { HomeFooter } from "@/app/_components/Home-footer";

export type HomePropsType = {
  id: string;
  
}
type categotyType = {
  _id: string;
  categoryName: string;
}


type foodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
};

export default function Home() {
  const { id } = useParams<HomePropsType>();
  const [categories, setCategories] = useState<categotyType[]>([]);
  const [foods, setFoods] = useState<foodType[]>([]);
  const pathname = usePathname();
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:8000/food_category");
      const data = await response.json();
      setCategories(data);
    };
    const fetchfoods = async () => {
      const response = await fetch(`http://localhost:8000/dishes/${id}`);
      const data = await response.json();
      setFoods(data);
    };
    fetchCategories();
    fetchfoods();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 500);
  }, [pathname]);
  
  const orderLocation = ""; // Define orderLocation variable
  console.log("from dynamic page", categories);
  return (
    <>
      <div className="bg-[#404040]">
        <HomeHeader orderLocation={orderLocation} setOrderLocation={(location: string) => {}}/>
        <img className="w-full" src="./homeLogo.png" alt="" />
        <CategoryScroll categoryData={categories} />
        <div>{categories?.find((category) => category._id == id)?.categoryName || " "}</div>

        <HomeFoodCard itemsId={id} orderLocation={orderLocation} />
        <HomeFooter />
      </div>
    </>
  );
}

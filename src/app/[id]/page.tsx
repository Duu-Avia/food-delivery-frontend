"use client"
import { useEffect, useState } from "react";
import { CategoryScroll } from "../_components/Category-scroll";
import { HomeFooter } from "../_components/Home-footer";

import { HomeFoodCard } from "../_components/HomeFood-card";
import { useParams, usePathname } from "next/navigation";
import { HomeFoodContainer } from "../_components/HomeFood-container";
import { HomeHeader } from "../_components/Home-header";


export default function Home (){
     const { id } = useParams();
      const [categories, setCategories] = useState([]);
      const [foods, setFoods] = useState([]);
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
        window.scrollTo(0,500)
      }, [pathname]);
      console.log("from dynamic page",categories)
  return (<>

    <div className="bg-[#404040]">
    <HomeHeader />
    <img className="w-full" src="./homeLogo.png" alt="" />
    <CategoryScroll  categoryData={categories}/>
    <div>{categories?.find((category: any) => category._id == id)?.categoryName || " "}</div>
    
    <HomeFoodCard itemsId={id}  />
    <HomeFooter/>
    </div></>
  );
};
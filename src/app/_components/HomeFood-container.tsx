import { useEffect, useState } from "react";
import { HomeFoodCard } from "./HomeFood-card";

export const HomeFoodContainer = ({ categoryData, foodData }) => {
  console.log({ categoryData });
  console.log("food data----,", foodData);
  return (
    <>
      {categoryData?.map((category) => (
        <div key={`user-${category?._id}`} className="">
          <div className="text-[1.9rem] text-[#FFFF]">{category?.categoryName}</div>
          <HomeFoodCard foodData={foodData} />
        </div>
      ))}
    </>
  );
};

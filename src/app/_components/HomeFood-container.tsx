import { useEffect, useState } from "react";
import { HomeFoodCard } from "./HomeFood-card";

export const HomeFoodContainer = ({ categoryData, orderLocation }) => {
  return (
    <>
      {categoryData?.map((category) => (
        <div key={`user-${category?._id}`} className="">
          <div className="text-[1.9rem] text-[#FFFF]">{category?.categoryName}</div>
          <HomeFoodCard itemsId={category?._id} orderLocation={orderLocation} />
        </div>
      ))}
    </>
  );
};

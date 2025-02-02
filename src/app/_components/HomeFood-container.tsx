import { useEffect, useState } from "react";
import { HomeFoodCard } from "./HomeFood-card";
import { CategoryAdd } from "./Category-add";
import { foodCategoriesType } from "./Food-category";
export type categoryDataType = {
  _id: string,
  categoryName:string,

}
export type homeFoodContainerProps = {
  categoryData: categoryDataType[],
  orderLocation: string
}

export const HomeFoodContainer = ({ categoryData, orderLocation }:homeFoodContainerProps) => {
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

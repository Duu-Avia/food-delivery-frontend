"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
export const OrderDetail = () => {
  const ordersString = localStorage.getItem("foodOrder");
  const order = JSON.parse(ordersString || "[]");
  const [foodOrderItem, setFoodOrderItem] = useState([]);
  const [qty, setQty] = useState(0);
  useEffect(() => {
    setFoodOrderItem(order);
  }, [ordersString]);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" w-[35px] h-[36px] rounded-full bg-[#FFFF] text-[#FFFFFF] text-[14px]">
            <ShoppingCart className="text-black" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[535px] h-100% bg-[#404040] pt-8 px-6">
          <div className="flex gap-2">
            <ShoppingCart className="text-[#FAFAFA]" />
            <div className="text-[#FAFAFA] text-[1.25rem] pb-5">Order detail</div>
          </div>
          <div className="flex items-center w-fulls h-12 bg-white rounded-full shadow-md overflow-hidden">
            <button className="flex-1 bg-gray-100 text-black font-medium h-full rounded-full transition duration-200 hover:bg-[#EF4444] hover:text-[#FAFAFA] active:scale-95">Cart</button>
            <button className="flex-1 text-black font-medium h-full rounded-full  transition duration-200 hover:bg-[#EF4444] hover:text-[#FAFAFA] active:scale-95 ">Order</button>
          </div>

          <div className="bg-[#FAFAFA] w-full h-100% rounded-[25px] mt-5">
            <div>My cart</div>
            {foodOrderItem?.map((item: any) => (
              <div key={`order-${item?.food?._id}`} className="flex">
                <div>
                  <img className="w-[124px] h-[120px] rounded-xl" src={item?.food.image} />
                </div>
                <div>
                  <div>{item?.food?.foodName}</div>
                  <div>{item?.food?.ingredients}</div>
                  <div>{item?.food?.qty}</div>
                  <div className="flex items-center justify-between pr-8">
                    <div className="flex items-center">
                      <Button
                        onClick={() => {
                          if (qty > 0) {
                            setQty(qty - 1);
                          }
                        }}
                        variant={"none"}>
                        <Minus />
                      </Button>
                      <div>{item?.qty}</div>
                      <Button
                        onClick={() => {
                          setQty(qty + 1);
                        }}
                        variant={"none"}>
                        <Plus />
                      </Button>
                    </div>
                    <div>{`$${item?.food?.price}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

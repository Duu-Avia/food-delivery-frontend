"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { set } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import { HomeFoodCardProps } from "./HomeFood-card";
import { HomeHeaderProps } from "./Home-header";

type orderLocationType = {
  orderLocation : string
}

export const OrderDetail = ({ orderLocation }:orderLocationType) => {
  const [foodOrderItem, setFoodOrderItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { getToken } = useAuth();
  const onPlusCheckout = async () => {
    const token = await getToken();
    console.log(orderLocation);
    console.log(token);
    if (!token) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
        method: "POST",
        headers: {
          authentication: token ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice: calculateTotal(),
          foodOrderItem,
          address: orderLocation,
         
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed successfully:", data);
        setFoodOrderItem([]);
        localStorage.removeItem("foodOrder")
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const onMinusOrder = (idx: Number) => {
    const newOrderItems:any = foodOrderItem.map((orderItem:any, index) => {
      if (idx === index && orderItem.qty > 1) {
        return { ...orderItem, qty: orderItem.qty - 1 };
      } else {
        return orderItem;
      }
    });
    setFoodOrderItem(newOrderItems);
    localStorage.setItem("foodOrder", JSON.stringify(newOrderItems));
  };

  const onPlusOrder = (idx: Number) => {
    const newOrderItems:any = foodOrderItem.map((orderItem:any, index) => {
      if (idx === index) {
        return { ...orderItem, qty: orderItem.qty + 1 };
      } else {
        return orderItem;
      }
    });
    setFoodOrderItem(newOrderItems);
    localStorage.setItem("foodOrder", JSON.stringify(newOrderItems));
  };

  const deleteOrderedFood = (idx: Number) => {
    const newDeletedOrderItems = foodOrderItem.filter((item, index) => idx !== index);
    setFoodOrderItem(newDeletedOrderItems);
    localStorage.setItem("foodOrder", JSON.stringify(newDeletedOrderItems));
  };
  const calculateTotal = () => {
    const totalPrice = foodOrderItem.reduce((total, orderItem:any) => {
      return total + (orderItem.qty * orderItem.food.price || 0);
    }, 0);
    return totalPrice + 1;
  };

  useEffect(() => {
    const handleOrderUpdate = () => {
      const updatedOrder = JSON.parse(localStorage.getItem("foodOrder") || "[]");
      setFoodOrderItem(updatedOrder);
    };

    // Fetch the initial order
    handleOrderUpdate();
  }, [isOpen]);

  return (
    <>
      <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
          <Button onClick={() => setIsOpen(true)} variant="outline" className=" w-[35px] h-[36px] rounded-full bg-[#FFFF] text-[#FFFFFF] text-[14px]">
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

          <div className="bg-[#FAFAFA] w-full h-100% rounded-[25px] mt-5 px-3">
            <div>My cart</div>
            {foodOrderItem?.map((item: any, idx: Number) => (
              <div key={`order-${item?.food?._id}`} className="flex">
                <div>
                  <img className="w-[124px] h-[120px] rounded-xl" src={item?.food.image} />
                </div>
                <div>
                  <div>{item?.food?.foodName}</div>
                  <div>{item?.food?.ingredients}</div>
                  <div>
                    <Button
                      onClick={() => {
                        deleteOrderedFood(idx);
                      }}>
                      <X />
                    </Button>
                  </div>
                  <div>{item?.food?.qty}</div>
                  <div className="flex items-center justify-between pr-8">
                    <div className="flex items-center">
                      <Button
                        onClick={() => {
                          onMinusOrder(idx);
                        }}
                        variant={"ghost"}>
                        <Minus />
                      </Button>
                      <div>{item?.qty}</div>
                      <Button
                        onClick={() => {
                          onPlusOrder(idx);
                        }}
                        variant={"ghost"}>
                        <Plus />
                      </Button>
                    </div>
                    <div>{`$${item?.food?.price * item?.qty}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#FAFAFA] w-full h-100% rounded-[25px] px-3 mt-5">
            <div className="pb-[20px] pt-[5px]">Payment info</div>

            <div className="flex justify-between pb-[8px]">
              <div>Items</div>
              <div>{calculateTotal() - 1}</div>
            </div>

            <div className="flex justify-between pb-[20px]">
              <div className="">Shipping</div>
              <div>0.99$</div>
            </div>
            <div className="border-b-[1px] border-dashed border-[#09090B80] "></div>

            <div className="flex justify-between pt-[20px]">
              <div>Total</div>
              <div>${calculateTotal()}</div>
            </div>
            <div className="py-[20px]">
              <PopoverClose asChild>
              <Button onClick={onPlusCheckout} className="w-full rounded-full bg-[#EF4444]">
                Checkout
              </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { Minus, Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
const CLOUDINARY_CLOUD_NAME = "dku0azubr";
export const HomeFoodCard = ({ itemsId, orderLocation }) => {
  const [cardFoodData, setCardFoodData] = useState([]);
  const [qty, setQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchFoods = async () => {
      const token = await getToken();
      const response = await fetch(`http://localhost:8000/dishes/${itemsId}`, {
        headers: {
          authentication: `${token}`,
        },
      });
      const data = await response.json();
      setCardFoodData(data);
    };
    fetchFoods();
  }, []);
  const addFoodOrder = (food) => {
    const oldOrderValue = localStorage.getItem("foodOrder");
    const oldOrderValueJson = JSON.parse(oldOrderValue || "[]");
    const oldFilteredOrder = oldOrderValueJson.find((item) => item.food._id === food._id);
    if (oldFilteredOrder) {
      oldFilteredOrder.qty += 1;
    } else {
      oldOrderValueJson.push({
        food,
        qty: 1,
      });
    }
    localStorage.setItem("foodOrder", JSON.stringify(oldOrderValueJson));

    console.log(oldFilteredOrder);
  };

  return (
    <>
      <div className="flex gap-5 p-2">
        {cardFoodData?.map((food?: any) => (
          <div className="relative p-3 border-solid border-[1px] border-[#E4E4E7] bg-[#FFFFFF] rounded-lg w-[270px] h-[241px]" key={`foody-${food?._id}`}>
            <div className="w-[238px] h-[129px]">{food?.image ? <img className="w-[238px] h-[129px] rounded-xl" src={food?.image || null} /> : <div className="w-[238px] h-[129px] bg-gray-100 flex justify-center items-center">No image</div>}</div>
            <div className="flex items-center justify-between">
              <div className="text-[1rem] text-[#EF4444] font-[500]">{food?.foodName}</div>
              <div className="text-[0.8rem] text-[#09090B] pl-[100px]">${food?.price}</div>
            </div>
            <div className="text-[#09090B] w-[100%]">{food?.ingredients}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className=" absolute top-[70px] left-[200px] rounded-full size-[45px] bg-[#FFFFFF]" variant="outline">
                  <Plus className="text-[#EF4444] " />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[826px]">
                <DialogHeader>
                  <DialogTitle className="">
                    <div className="flex">
                      <div>
                        <img className="w-[377px] h-[364px] rounded-xl" src={food?.image} alt="" />
                      </div>
                      <div className="pl-[19px] text-[1rem] text-[#09090B] font-[400]">
                        <div className="text-[1.7rem] text-[#EF4444] font-[500] pt-8">{food?.foodName}</div>
                        <div className="pt-5">{food?.ingredients}</div>
                        <div className="pt-[180px] gap-10">
                          <div className="flex ">
                            <div>
                              <p>Total price</p>
                              <div className="font-[600] pr-[200px]">${totalPrice}</div>
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <Button
                                  onClick={() => {
                                    if (qty > 0) {
                                      setQty(qty - 1);
                                      setTotalPrice(totalPrice - food?.price);
                                    }
                                  }}
                                  className="size-[44px] rounded-full"
                                  variant={"outline"}>
                                  <Minus />
                                </Button>
                                <div>{qty}</div>
                                <Button
                                  onClick={() => {
                                    setQty((prevQty) => {
                                      const newQty = prevQty + 1;
                                      setTotalPrice(newQty * food?.price);
                                      return newQty;
                                    });
                                  }}
                                  className="size-[44px] rounded-full"
                                  variant={"outline"}>
                                  <Plus />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <DialogClose asChild>
                              <Button
                                onClick={() => {
                                  if (!orderLocation) {
                                    alert("Please add location");
                                  }
                                  addFoodOrder(food);
                                }}
                                className="w-full"
                                type="button">
                                Add to card
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <DialogFooter></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
};

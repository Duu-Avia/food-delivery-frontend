import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export type HomeFoodCardProps = {
  itemsId: string;
  orderLocation: string;
};

export type FoodItem = {
  _id: string;
  image?: string;
  foodName: string;
  price: number;
  ingredients?: string;
};

export const HomeFoodCard = ({ itemsId, orderLocation }: HomeFoodCardProps) => {
  const [cardFoodData, setCardFoodData] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        if (!token) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes/${itemsId}`, {
          headers: {
            authentication: token,
          },
        });

        const data: FoodItem[] = await response.json();
        setCardFoodData(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, [itemsId, getToken]);

  const addFoodOrder = (food: FoodItem) => {
    const oldOrderValue = localStorage.getItem("foodOrder");
    const oldOrderValueJson: { food: FoodItem; qty: number }[] = JSON.parse(oldOrderValue || "[]");

    const existingOrder = oldOrderValueJson.find((item) => item.food._id === food._id);
    if (existingOrder) {
      existingOrder.qty += 1;
    } else {
      oldOrderValueJson.push({ food, qty: 1 });
    }

    localStorage.setItem("foodOrder", JSON.stringify(oldOrderValueJson));
  };

  const SkeletonCard = () => (
    <div className="relative p-3 border border-[#E4E4E7] bg-[#FFFFFF] rounded-lg w-[270px] h-[241px] animate-pulse">
      <div className="w-[238px] h-[129px] bg-gray-200 rounded-xl"></div>
      <div className="flex items-center justify-between mt-3">
        <div className="w-[80px] h-[20px] bg-gray-200 rounded"></div>
        <div className="w-[50px] h-[20px] bg-gray-200 rounded"></div>
      </div>
      <div className="w-full h-[40px] bg-gray-200 rounded mt-2"></div>
      <div className="absolute top-[70px] left-[200px] w-[45px] h-[45px] bg-gray-300 rounded-full"></div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-5 p-2">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
      ) : cardFoodData.length > 0 ? (
        cardFoodData.map((food) => (
          <div
            className="relative p-3 border border-[#E4E4E7] bg-[#FFFFFF] rounded-lg w-[270px] h-[241px]"
            key={food._id}
          >
            <div className="w-[238px] h-[129px]">
              {food.image ? (
                <img className="w-[238px] h-[129px] rounded-xl" src={food.image} alt={food.foodName} />
              ) : (
                <div className="w-[238px] h-[129px] bg-gray-100 flex justify-center items-center">No image</div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[1rem] text-[#EF4444] font-[500]">{food.foodName}</div>
              <div className="text-[0.8rem] text-[#09090B] pl-[100px]">${food.price}</div>
            </div>
            <div className="text-[#09090B] w-full">{food.ingredients}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="absolute top-[70px] left-[200px] rounded-full size-[45px] bg-[#FFFFFF]" variant="outline">
                  <Plus className="text-[#EF4444]" />
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ))
      ) : (
        <div className="text-center w-full text-gray-500 text-lg">No food items available</div>
      )}
    </div>
  );
};

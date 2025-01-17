import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
const addFoodCategory = async () => {
  const response = await fetch(`http://localhost:8000/admin/food_menu/food`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: inputValue }),
  });
  const data = await response.json();
  setFoodCategories([...foodCategories, data.newItem]);
};
export const FoodAdd = () => {
  return (
    <>
      <div className=" p-3 border-dashed border-[1px] border-[#EF4444] rounded-lg w-[270px] h-[241px] text-center">
        <div className="pt-[60px]">
          <Button
            className="rounded-full size-[36px] bg-[#EF4444]"
            variant="outline"
          >
            <Plus className="text-white" />
          </Button>
        </div>

        <div className="text-[#09090B] w-[100%] px-[30px]">
          Add new Dish to Appetizers{" "}
        </div>
      </div>
    </>
  );
};

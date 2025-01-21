"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type foodTypes = {
  _id: Number;
  foodName: String;
  price: Number;
  image: String;
  ingredients: String;
  category: String;
};

export function FoodCard({ itemsID, foodCategories, singleCategoryName }: any) {
  const { id } = useParams();
  const [foods, setFoods] = useState<foodTypes[]>([]);
  const [foodId, setFoodId] = useState("");
  const [newFoodName, setNewFoodName] = useState("");
  const [newFoodCategory, setNewFoodCategory] = useState("");
  const [newFoodPrice, setNewFoodPrice] = useState("");
  const [newFoodIngredients, setNewFooDIngredients] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const editFood = async () => {
    const response = await fetch(
      `http://localhost:8000/admin/food_menu/food/${foodId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: newFoodName,
          price: newFoodPrice,
          image: newImageUrl,
          ingredients: newFoodIngredients,
          category: newFoodCategory,
        }),
      }
    );
    const data = await response.json();
    setFoods([...foods, data.updatedFood]);
  };

  const deleteFood = async () => {
    const response = await fetch(`http://localhost:8000/admin/food_menu/food`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: foodId,
      }),
    });
    const data = await response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8000/admin/food_menu/food/${itemsID}`
      );
      const data = await response.json();
      setFoods(data);
    };
    fetchData();
  }, []);

  const nameHandler = (e) => {
    setNewFoodName(e.target.value);
  };
  const categoryHandler = (e) => {
    setNewFoodCategory(e.target.value);
  };
  const priceHandler = (e) => {
    setNewFoodPrice(e.target.value);
  };
  const ingredientsHandler = (e) => {
    setNewFooDIngredients(e.target.value);
  };
  const imageUrlHandler = (e) => {
    setNewImageUrl(e.target.value);
  };
  console.log(foodId);
  console.log(singleCategoryName);
  return (
    <>
      <div className="flex gap-5 p-2">
        {foods?.map((food?: any) => (
          <div
            className="relative p-3 border-solid border-[1px] border-[#E4E4E7] rounded-lg w-[270px] h-[241px]"
            key={food?._id}>
            <div className="w-[238px] h-[129px]"></div>
            <div className="flex items-center justify-between">
              <div className="text-[1rem] text-[#EF4444] font-[500]">
                {food?.foodName}
              </div>
              <div className="text-[0.8rem] text-[#09090B] pl-[100px]">
                ${food?.price}
              </div>
            </div>
            <div className="text-[#09090B] w-[100%]">{food?.ingredients}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setFoodId(food?._id)}
                  className="absolute top-[70px] left-[200px] rounded-full size-[45px] bg-[#FFFFFF]"
                  variant="outline">
                  <Pencil className="text-[#EF4444] " />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[472px]">
                <DialogHeader>
                  <DialogTitle>Dishes info</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-left">Dish name</Label>
                    <Input
                      onChange={nameHandler}
                      defaultValue={food?.foodName}
                      className="w-[280px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-left">Dish category</Label>
                    <Select>
                      <SelectTrigger className="w-[280px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {foodCategories?.map((categories) => (
                            <SelectItem
                              key={`select-${categories?._id}`}
                              value={singleCategoryName}>
                              {categories.categoryName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-left">ingredients</Label>
                    <Input
                      onChange={ingredientsHandler}
                      value={food?.ingredients}
                      className="w-[280px] py-[50px]"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-left">Price</Label>
                    <Input
                      onChange={priceHandler}
                      value={food?.price}
                      className="w-[280px]"
                    />
                  </div>
                  <div className="flex items-center justify-around">
                    <Label className="text-left ml-[-30px]">Image</Label>
                    <Input
                      onChange={imageUrlHandler}
                      type="file"
                      className=" w-[288px] h-[116px] border-dashed border-[#2563EB0D] bg-[#2563EB0D]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={deleteFood}
                    className="bg-white  border-[1px] border-[#EF444480] mr-[250px]">
                    <Trash className="text-[#EF4444]" />
                  </Button>
                  <Button
                    onClick={() => {
                      editFood();
                    }}
                    type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
}

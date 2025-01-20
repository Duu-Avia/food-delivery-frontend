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
import { DialogClose } from "@radix-ui/react-dialog";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const FoodAdd = ({ itemsID }) => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const addFoods = async () => {
    const response = await fetch(`http://localhost:8000/admin/food_menu/food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: foodName,
        price: foodPrice,
        image: foodImage,
        ingredients: ingredients,
        category: itemsID,
      }),
    });
    const data = await response.json();
    setFoods([...foods, data.newFood]);
  };

  // useEffect(()=>{
  //   const fetchData = async() => {
  //     const response = await fetch(`http://localhost:8000/admin/food_menu/food`);
  //     const data = await response.json();
  //     setFoods(data);
  // }
  // fetchData()
  // },[])

  const nameChangeHandler = (e) => {
    setFoodName(e.target.value);
  };
  const priceChangeHandler = (e) => {
    setFoodPrice(e.target.value);
  };
  const ingredientsChangeHandler = (e) => {
    setIngredients(e.target.value);
  };
  const ImageChangeHandler = (e) => {
    setFoodImage(e.target.value);
  };
  return (
    <>
      <div className=" p-3 border-dashed border-[1px] border-[#EF4444] rounded-lg w-[270px] h-[241px] text-center">
        <div className="pt-[60px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="rounded-full size-[36px] bg-[#EF4444]"
                variant="outline">
                <Plus className="text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-fit">
              <DialogHeader>
                <DialogTitle>{`Add new Dish to Foodname`}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex gap-5">
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="name">Food name</Label>
                    <Input
                      onChange={nameChangeHandler}
                      id="name"
                      placeholder="Type food name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="username">Food price</Label>
                    <Input
                      onChange={priceChangeHandler}
                      id="username"
                      placeholder="Enter price..."
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div className=" items-center gap-4 ">
                  <Label htmlFor="username">Ingredients</Label>
                  <Input
                    onChange={ingredientsChangeHandler}
                    id="username"
                    placeholder="List ingredients..."
                    className="pb-[60px] pt-[20px]"
                  />
                </div>
                <div className=" items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Food image
                  </Label>
                  <Input
                    onChange={ImageChangeHandler}
                    type="file"
                    className="w-[412px] h-[138px] border-dashed border-[#2563EB0D] bg-[#2563EB0D]"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={addFoods} type="submit">
                    Add Dish
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-[#09090B] w-[100%] px-[30px]">
          Add new Dish to Appetizers{" "}
        </div>
      </div>
    </>
  );
};

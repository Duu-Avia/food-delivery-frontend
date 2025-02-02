import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const CLOUDINARY_CLOUD_NAME = "dku0azubr";

type foodsType = {
  foodName: string,
  price: number,
  image: string,
  ingredients: string,
  category: string,
}

export const FoodAdd = ({ itemsID }:any) => {
  const [foods, setFoods] = useState<foodsType[]>([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const {getToken} = useAuth()

  const addFoods = async () => {
    const token = await getToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", authentication: `${token}`},
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
  console.log(foodImage);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dishes/${itemsID}`);
      const data = await response.json();
      setFoods(data);
    };
    fetchData();
  }, []);

  const nameChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };
  const priceChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setFoodPrice(e.target.value);
  };
  const ingredientsChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };
  const ImageChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files[0]);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "POST",
        body: data,
      });

      const dataJson = await response.json();
      setFoodImage(dataJson.secure_url);
    }
  };
  return (
    <>
      <div className=" p-3 border-dashed border-[1px] border-[#EF4444] rounded-lg w-[270px] h-[241px] text-center">
        <div className="pt-[60px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full size-[36px] bg-[#EF4444]" variant="outline">
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
                    <Input onChange={nameChangeHandler} id="name" type="text" placeholder="Type food name" className="col-span-3" />
                  </div>

                  <div className="grid grid-cols-2 items-center gap-4">
                    <Label htmlFor="username">Food price</Label>
                    <Input onChange={priceChangeHandler} id="username" type="number" placeholder="Enter price..." className="col-span-3" />
                  </div>
                </div>

                <div className=" items-center gap-4 ">
                  <Label htmlFor="username">Ingredients</Label>
                  <Input onChange={ingredientsChangeHandler} id="username" type="text" placeholder="List ingredients..." className="pb-[60px] pt-[20px]" />
                </div>

                <div className="relative items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Food image
                  </Label>
                  <Input onChange={ImageChangeHandler} type="file" className="w-[412px] h-[138px] border-dashed border-[#2563EB0D] bg-[#2563EB0D]" />
                  {foodImage && <img className="w-[412px] h-[138px] absolute top-5 left-0" src={foodImage} alt="" />}
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

        <div className="text-[#09090B] w-[100%] px-[30px]">Add new Dish to Appetizers </div>
      </div>
    </>
  );
};

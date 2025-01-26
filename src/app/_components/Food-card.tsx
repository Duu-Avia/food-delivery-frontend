"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@clerk/nextjs";

export type foodTypes = {
  _id: Number;
  foodName: String;
  price: Number;
  image: String;
  ingredients: String;
  category: String;
};
const CLOUDINARY_CLOUD_NAME = "dku0azubr";
export function FoodCard({ itemsID, foodCategories, singleCategoryName }: any) {
  const [foods, setFoods] = useState<foodTypes[]>([]);
  const [foodId, setFoodId] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [selectOption, setSelectOption] = useState(singleCategoryName);
  const { getToken } = useAuth();
 

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const response = await fetch(`http://localhost:8000/dishes/${itemsID}`,{
        headers:{
          authentication:`${token}`
        }
      });
      const data = await response.json();
      setFoods(data);
    };
    fetchData();
  }, []);

  const editFood = async (formData: any) => {
    const response = await fetch(`http://localhost:8000/dishes/${foodId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: formData.get("foodName"),
        price: formData.get("price"),
        image: newImageUrl,
        ingredients: formData.get("ingredients"),
        category: selectOption,
      }),
    });
    const data = await response.json();
    setFoods([...foods, data.updatedFood]);
    console.log("hi");
  };

  const deleteFood = async () => {
    const response = await fetch(`http://localhost:8000/dishes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: foodId,
      }),
    });
    const data = await response.json();
  };

  const imageUrlHandler = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files[0]);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
        method: "PUT",
        body: data,
      });
      const dataJson = await response.json();
      setNewImageUrl(dataJson.secure_url);
    }
  };

  console.log(foods);
  return (
    <>
      <div className="flex flex-wrap gap-5 p-2">
        {foods?.map((food?: any) => (
          <div className="relative p-3 border-solid border-[1px] border-[#E4E4E7] rounded-lg w-[270px] h-[241px]" key={`foody-${food?._id}`}>
            <div className="w-[238px] h-[129px]">{food?.image ? <img className="w-[238px] h-[129px] rounded-xl" src={food?.image || null} /> : <div className="w-[238px] h-[129px] bg-gray-100 flex justify-center items-center">No image</div>}</div>
            <div className="flex items-center justify-between">
              <div className="text-[1rem] text-[#EF4444] font-[500]">{food?.foodName}</div>
              <div className="text-[0.8rem] text-[#09090B] pl-[100px]">${food?.price}</div>
            </div>
            <div className="text-[#09090B] w-[100%]">{food?.ingredients}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setFoodId(food?._id);
                  }}
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
                <form id="editForm">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-left">Dish name</Label>
                      <Input name="foodName" type="text" defaultValue={food?.foodName} className="w-[280px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-left">Dish category</Label>
                      <Select
                        value={selectOption}
                        onValueChange={(value) => {
                          setSelectOption(value);
                        }}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {foodCategories?.map((categories) => (
                              <SelectItem key={`select-${categories?._id}`} value={categories?._id}>
                                {categories.categoryName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-left">ingredients</Label>
                      <Input type="text" name="ingredients" defaultValue={food?.ingredients} className="w-[280px] py-[50px]" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-left">Price</Label>
                      <Input name="price" type="number" defaultValue={food?.price} className="w-[280px]" />
                    </div>
                    <div className="relative flex items-center justify-around">
                      <Label className="text-left ml-[-30px]">Image</Label>
                      <Input onChange={imageUrlHandler} type="file" className="absolute w-[288px] h-[116px] left-[110px]  border-dashed border-[#2563EB0D] bg-[#2563EB0D]" />
                      {newImageUrl ? <img className="w-[238px] h-[129px]" src={newImageUrl} alt="" /> : <img src={food?.image || null} className="w-[238px] h-[129px] bg-gray-100 flex justify-center items-center" alt="" />}
                    </div>
                  </div>
                </form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={deleteFood} className="bg-white  border-[1px] border-[#EF444480] mr-[250px]">
                      <Trash className="text-[#EF4444]" />
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        const form = document.getElementById("editForm") as HTMLFormElement;
                        const formData = new FormData(form);
                        editFood(formData);
                      }}
                      type="button">
                      Save changes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
}

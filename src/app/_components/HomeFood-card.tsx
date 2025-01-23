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
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export const HomeFoodCard = ({ itemsId }) => {
  const [cardFoodData, setCardFoodData] = useState([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const response = await fetch(`http://localhost:8000/dishes/${itemsId}`);
      const data = await response.json();
      setCardFoodData(data);
    };
    fetchFoods();
  }, []);
  console.log("from card id", itemsId);
  console.log("from card", cardFoodData);
  return (
    <>
      <div className="flex gap-5 p-2">
        <div></div>
        {cardFoodData?.map((food?: any) => (
          <div
            className="relative p-3 border-solid border-[1px] border-[#E4E4E7] rounded-lg w-[270px] h-[241px]"
            key={`foody-${food?._id}`}
          >
            <div className="w-[238px] h-[129px]"></div>
            <div className="flex items-center justify-between">
              <div className="text-[1rem] text-[#EF4444] font-[500]">{food?.foodName}</div>
              <div className="text-[0.8rem] text-[#09090B] pl-[100px]">${food?.price}</div>
            </div>
            <div className="text-[#09090B] w-[100%]">{food?.ingredients}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="absolute top-[70px] left-[200px] rounded-full size-[45px] bg-[#FFFFFF]"
                  variant="outline"
                >
                  <Pencil className="text-[#EF4444] " />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[472px]">
                <DialogHeader>
                  <DialogTitle>Dishes info</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="bg-white  border-[1px] border-[#EF444480] mr-[250px]">
                      <Trash className="text-[#EF4444]" />
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button">Save changes</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
};

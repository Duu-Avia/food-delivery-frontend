
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"



import { Plus } from "lucide-react";
import { useState } from "react";
export const CategoryAdd = ({ addFoodCategory, setInputValue, inputValue }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
    setIsDisabled(false);
  };

  return (
    <div>
     <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
     <input className="border-solid border-[1px] border-[#E4E4E7] h-[38px]"></input>
     <div className="text-end">  <Button className="w-[123px] ">Add category</Button></div>
   
    </DialogHeader>
  
  </DialogContent>
</Dialog>

    </div>
  );
};

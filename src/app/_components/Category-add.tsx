
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
export const CategoryAdd = ({ addFoodCategory, setInputValue, inputValue }) => {
  const [isDisabled, setIsDisabled] = useState(true);



  console.log(isDisabled)
  const onChangeHandler = (e) => {
    const value = (e.target.value)
    setInputValue(e.target.value);
      setIsDisabled(!value)
  };



  return (
    <div>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full size-[36px] bg-[#EF4444]" variant="outline"><Plus className="text-white"/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <DialogDescription className="text-[#09090B] text-[0.8rem] font-[500]">
           Category name
          </DialogDescription>
          <div className="grid grid-cols-4 items-center gap-4">
           
            <Input placeholder="Type category name..." onChange={onChangeHandler} className="col-span-3" />
          </div>
      
        </div>
     
        <DialogFooter >
        <DialogClose asChild>
          <Button disabled={isDisabled}  onClick={addFoodCategory} type="submit">Add new category</Button>
          </DialogClose>
        </DialogFooter>
      
      </DialogContent>
    </Dialog>
    </div>
  );
};

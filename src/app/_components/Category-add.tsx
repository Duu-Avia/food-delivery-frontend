import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
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
        <DialogTrigger asChild>
          <Button
            size="sm"
            className=" bg-[#EF4444] border-none hover:bg-black rounded-full size-[36px]"
            variant="outline"
          >
            <Plus size={9} color="white" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                onChange={onChangeHandler}
                placeholder="Type category name..."
                className="col-span-3"
                type="text"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={isDisabled}
                onClick={addFoodCategory}
                type="submit"
              >
                Add category
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

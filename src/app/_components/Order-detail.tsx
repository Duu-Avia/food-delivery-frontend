import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ShoppingCart } from "lucide-react";
export const OrderDetail = () => {
return(
<>
<Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className=" w-[35px] h-[36px] rounded-full bg-[#FFFF] text-[#FFFFFF] text-[14px]"><ShoppingCart className="text-black"/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-[535px] h-100% bg-[#404040] pt-8 px-6">

      <div className="flex gap-2">
      <ShoppingCart className="text-[#FAFAFA]"/>
      <div className="text-[#FAFAFA] text-[1.25rem] pb-5">Order detail</div>
      </div>
      <div className="flex items-center w-fulls h-12 bg-white rounded-full shadow-md overflow-hidden">
      <button className="flex-1 bg-gray-100 text-black font-medium h-full rounded-full transition duration-200 hover:bg-[#EF4444] hover:text-[#FAFAFA] active:scale-95">
        Cart
      </button>
      <button className="flex-1 text-black font-medium h-full rounded-full  transition duration-200 hover:bg-[#EF4444] hover:text-[#FAFAFA] active:scale-95 ">
        Order
      </button>
      </div>

      <div className="bg-[#FAFAFA] w-full h-100% rounded-[25px] mt-5">
      <div>My cart</div>
      <div></div>
      </div>
    
      </PopoverContent>
    </Popover>
</>
)
}
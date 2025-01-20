import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings } from "lucide-react";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuTruck } from "react-icons/lu";
import Link from "next/link";

export const LeftSideBar = () => {
  return (
    <>
    <div className="px-[20px] h-screen">
      <div className="flex gap-[5px] justify-center py-[40px]">
        <img className="w-[40px] h-[40px]" src="/Logo.png"></img>
        <div>
          <div className="text-[#09090B] text-[1.125rem] font-[600]">
            NomNom
          </div>
          <div className="text-[#71717A] text-[0.75rem]">Swift delivery</div>
        </div>
      </div>
      <div>
        <div className="py-[10px]">
          <Link href={`/admin/food_menu`}><Button
            className=" border-none w-[165px] h-[40px] rounded-full hover:bg-[#18181B] hover:text-[#FAFAFA]"
            variant="outline"
          >
            <LayoutDashboard /> Food menu
          </Button>
          </Link>
        </div>
        <div className="py-[10px]">
          <Button
            className="border-none w-[165px] h-[40px] rounded-full hover:bg-[#18181B] hover:text-[#FAFAFA]"
            variant="outline"
          >
            <LuTruck />
            Orders
          </Button>
        </div>
        <div className="py-[10px]">
          <Button
            className="border-none w-[165px] h-[40px] rounded-full hover:bg-[#18181B] hover:text-[#FAFAFA]"
            variant="outline"
          >
            <Settings />
            Settings
          </Button>
        </div>
      </div>
      </div>
    </>
  );
};

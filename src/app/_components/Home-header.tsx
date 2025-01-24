import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HomeHeader() {
  return (
    <div className="flex justify-between items-center w-screen h-100% bg-[#18181B] text-white  py-[10px] px-[70px]">
      <div className="flex">
        <div>
          <img src={`/headerlogo.png`} />
        </div>
        <div>
          <div className="flex">
            <div className="flex text-[1.25rem] font-600">
              Nom
              <div className="text-[1.25rem] font-600 text-[#EF4444]">Nom</div>
            </div>
          </div>
          <div className="text-[0.8rem]">Swift delivery</div>
        </div>
      </div>
      <div className="flex gap-5 ">
        <div>
          <Link href="/create_account">
            <Button className="bg-[#FFFFFF] text-[#18181B] text-[14px] w-[75px] h-[36px] rounded-full ">Sign up</Button>
          </Link>
        </div>
        <div>
          <Button className="bg-[#EF4444] text-[#FFFFFF] text-[14px]  w-[75px] h-[36px] rounded-full">Log in</Button>
        </div>
      </div>
    </div>
  );
}

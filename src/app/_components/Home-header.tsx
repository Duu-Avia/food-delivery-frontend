import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Input } from "@/components/ui/input";
import { ShoppingCart } from "lucide-react";
import { OrderDetail } from "./Order-detail";


export function HomeHeader({ setLocation }) {
  const locationHandler = (e) => {
    setLocation(e.target.value);
  }
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
      
           
        </div>
        <div>
        <ClerkProvider> 
      <SignedOut>
        <div className="flex justify-center bg-[#EF4444] text-[#FFFFFF] text-[14px]  w-[75px] h-[36px] rounded-full">
        <SignInButton  />
        </div>
          </SignedOut>

          <SignedIn>
          <div className="flex gap-5">
          <Input onChange={locationHandler} placeholder="Add location" className="w-[200px] h-[36px] rounded-full bg-[#FFFFF] border-[1px] border-[#FFFFFF] text-black text-[14px]"/>
          {/* <Button className="w-[35px] h-[36px] rounded-full bg-[#FFFF] text-[#FFFFFF] text-[14px]"><ShoppingCart className="text-black"/></Button> */}
          <OrderDetail/>
            <UserButton />
          </div>
         
          </SignedIn>
        
          </ClerkProvider>
        </div>
      </div>
    </div>
  );
}

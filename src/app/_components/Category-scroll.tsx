import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const CategoryScroll = ({categoryData}:any) => {

  return (
    <>
      <Carousel>
        <CarouselContent className="gap-5  ">
          <CarouselItem className="basis-1/8 ">
            <Link href="/">
            <Badge className="w-fit bg-[#FFFFFF] text-[#18181B] text-[1.2rem] font-[400] hover:bg-[#EF4444] hover:text-[#FAFAFA]">
              All dishes
            </Badge></Link>
          </CarouselItem>

          {categoryData?.map((category: any) => (
            <CarouselItem key={`caty-${category?._id}`} className="basis-1/8 ">
              <Link href={`/${category?._id}`}>
                <Badge className="w-fit bg-[#FFFFFF] text-[#18181B] text-[1.2rem] font-[400] hover:bg-[#EF4444] hover:text-[#FAFAFA]">
                  {category?.categoryName}
                </Badge>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

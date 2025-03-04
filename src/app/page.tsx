"use client";
import { useState } from "react";
import { HomeFooter } from "./_components/Home-footer";
import { HomeHeader } from "./_components/Home-header";
import { HomeSection } from "./_components/Home-section";

export default function HomePage() {
  const [orderLocation, setOrderLocation] = useState<string>("");

  return (
    <div className="bg-[#404040]">
      <HomeHeader orderLocation={orderLocation} setOrderLocation={setOrderLocation} />
      <HomeSection orderLocation={orderLocation} />
      <HomeFooter />
      
    </div>
  );
}

"use client"
import { useState } from "react";
import { HomeFooter } from "./_components/Home-footer";
import { HomeHeader } from "./_components/Home-header";
import { HomeSection } from "./_components/Home-section";


export default function HomePage() {
  const [location, setLocation] = useState("");
  
    
  return (
    <div className="bg-[#404040]">
      <HomeHeader setLocation={setLocation}/>
      <HomeSection location={location}/>
      <HomeFooter />
    </div>
  );
}

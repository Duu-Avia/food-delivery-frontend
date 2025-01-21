import { CategoryScroll } from "./Category-scroll"


export const HomeSection = () =>{
    
    
    return <>
    <img className="w-full" src="./homeLogo.png" alt="" />
    <div className="px-[90px] py-7">
        <div className="text-[1.9rem] text-[#FFFFFF] font-600">Categories</div>
        <CategoryScroll/>
    </div>
    </> 
}
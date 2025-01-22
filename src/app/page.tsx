import { HomeFooter } from "./_components/Home-footer";
import { HomeHeader } from "./_components/Home-header";
import { HomeSection } from "./_components/Home-section";


export default function HomePage() {
  return (
    <div className="bg-[#404040]">
      <HomeHeader />
      <HomeSection />
      <HomeFooter />
    </div>
  );
}

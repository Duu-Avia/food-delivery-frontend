export const HomeFooter = () => {
  return (
    <div className="bg-[#18181B] w-screen h-[755px]">
      <div className="py-[50px]">
        <div className="bg-[#EF4444] text-white py-[20px]">
          Fresh fast delivered Fresh fast delivered Fresh fast delivered Fresh
          fast delivered Fresh fast delivered Fresh fast delivered Fresh fast
          delivered
        </div>
      </div>

      <div className="flex justify-around pt-[70px]">
        <div className="">
          <div className="pl-4">
            <img className="pb-2" src={`/headerlogo.png`} />
          </div>
          <div>
            <div className="flex">
              <div className="flex text-[1.25rem] font-600 text-white">
                Nom
                <div className="text-[1.25rem] font-600 text-[#EF4444]">
                  Nom
                </div>
              </div>
            </div>
            <div className="text-[0.8rem] text-white">Swift delivery</div>
          </div>
        </div>
        <nav className="">
          <h1 className="pb-[15px] text-[#71717A] text-[1rem]">NOMNOM</h1>
          <ul className="text-[1rem] text-[#FAFAFA] ">
            <li className="py-1">
              <a href="/">Home</a>
            </li>
            <li className="py-1">
              <a href="/contact">Contact us</a>
            </li>
            <li className="py-1">
              <a href="/delivery-zone">Delivery zone</a>
            </li>
          </ul>
        </nav>
        <nav className="">
          <h1 className="pb-[15px] text-[#71717A] text-[1rem]">MENU</h1>
          <ul className="text-[1rem] text-[#FAFAFA] ">
            <li className="py-1">
              <a href="/"></a>
            </li>
            <li className="py-1">
              <a href="/contact">Contact us</a>
            </li>
            <li className="py-1">
              <a href="/delivery-zone">Delivery zone</a>
            </li>
          </ul>
        </nav>
        <nav className="">
          <h1 className="pb-[15px] text-[#71717A] text-[1rem]"></h1>
          <ul className="text-[1rem] text-[#FAFAFA] ">
            <li className="py-1">
              <a href="/"></a>
            </li>
            <li className="py-1">
              <a href="/contact">Contact us</a>
            </li>
            <li className="py-1">
              <a href="/delivery-zone">Delivery zone</a>
            </li>
          </ul>
        </nav>
        <nav className="">
          <h1 className="pb-[15px] text-[#71717A] text-[1rem]">FOLLOW US</h1>
          <ul className="text-[1rem] text-[#FAFAFA] ">
            <li className="py-1">
              <a href="/">fb</a>
            </li>
            <li className="py-1">
              <a href="/contact">ig</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

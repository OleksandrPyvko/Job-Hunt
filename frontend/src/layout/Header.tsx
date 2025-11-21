import { useState } from "react";
import Navigation from "../components/Header/Navigation";
import { MenuContextProvider } from "../contexts/utils";
import { useMenu } from "../contexts/MenuContext";

function Header() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  console.log(isMenuOpen);

  return (
    <header className="container flex   md:flex-row  w-full  align-middle  md:h-14 ]">
      <div className="flex items-center justify-between w-full md:w-fit md:justify-start  h-full max-h-14">
        <p className="font-black text-4xl  italic ">LOGO</p>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          X
        </div>
      </div>
      <Navigation />
    </header>
  );
}

export default Header;

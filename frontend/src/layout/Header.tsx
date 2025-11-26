import Navigation from "../components/Header/Navigation";
import { useMenu } from "../contexts/MenuContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  console.log(isMenuOpen);

  return (
    <header className="flex md:flex-row items-center w-full h-18 md:h-14 align-middle container fixed top-0 left-0  bg-white z-50">
      <div className="flex justify-between md:justify-start items-center w-full md:w-fit h-full max-h-14">
        <p className="font-black text-4xl italic">
          <NavLink to="/">LOGO</NavLink>
        </p>
        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          X
        </div>
      </div>
      <Navigation />
    </header>
  );
}

export default Header;

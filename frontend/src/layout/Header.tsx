import Navigation from "../components/Header/Navigation";
import { useMenu } from "../contexts/MenuContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  console.log(isMenuOpen);

  return (
    <header className="flex md:flex-row items-center w-full h-18  fixed top-0 left-0 bg-white z-50">
      <div className="container flex">
        <div className="flex justify-between md:justify-start items-center w-full md:w-fit h-full max-h-14">
          <p className="font-black text-4xl italic">
            <NavLink to="/">
              <p className="text-shadow-lg hover:text-shadow-sky-400 hover:text-white transition-all duration-300 ease-in-out">
                JH
              </p>
            </NavLink>
          </p>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            X
          </div>
        </div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;

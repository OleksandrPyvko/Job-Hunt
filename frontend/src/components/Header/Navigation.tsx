import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMenu } from "../../contexts/MenuContext";
import Modal from "../Modal";
import Test from "../Test";
import NavAuth from "./NavAuth";

const linkClass =
  "text-sky-500 font-semibold border-b-2 border-sky-600 transition-all duration-300 ease-in-out ";

function Navigation() {
  const { setIsLoggedIn } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const location = useLocation();
  const path = location.pathname;
  const login = useRef<HTMLDialogElement>(null);

  function onNavLinkClick() {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <nav
        className={`  "text-center flex flex-col md:flex md:flex-row gap-4  h-full md:justify-between md:w-full md:ml-24 md:items-center text-sm`}
      >
        {/* MOBILE*/}

        <div
          className={` ${
            !isMenuOpen
              ? " left-[-100%] opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } duration-500 ease-in-out bg-white dark:bg-(--darkbg)   md:hidden text-xl max-h-[calc(100dvh-70px)] h-full text-left md:flex-row fixed left-0 bottom-0  w-screen   overflow-hidden flex flex-col justify-between`}
        >
          <ul className="flex flex-col justify-center gap-6 py-10 pl-10">
            <li>
              <NavLink
                onClick={onNavLinkClick}
                to="/"
                className={path === "/" ? linkClass : "font-semibold"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onNavLinkClick}
                to="/dashboard"
                className={path === "/dashboard" ? linkClass : "font-semibold"}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onNavLinkClick}
                to="applications"
                className={
                  path === "/applications" ? linkClass : "font-semibold"
                }
              >
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onNavLinkClick}
                to="interviews"
                className={path === "/interviews" ? linkClass : "font-semibold"}
              >
                Interviews
              </NavLink>
            </li>
          </ul>
          <div className="flex justify-center items-center py-14">
            <NavAuth login={login} />
          </div>
        </div>

        {/* DESkTOP */}

        <div className="hidden md:flex md:justify-between items-center md:w-full">
          <ul className="md:flex md:flex-row items-center gap-12 text-lg">
            <li>
              <NavLink
                to="/dashboard"
                className={path === "/dashboard" ? linkClass : "font-semibold"}
                onClick={onNavLinkClick}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onNavLinkClick}
                to="applications"
                className={
                  path === "/applications" ? linkClass : "font-semibold"
                }
              >
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={onNavLinkClick}
                to="interviews"
                className={path === "/interviews" ? linkClass : "font-semibold"}
              >
                Interviews
              </NavLink>
            </li>
          </ul>
          <NavAuth login={login} />
        </div>
      </nav>
      <Modal ref={login} onClose={() => login.current?.close()}>
        <Test ref={login} setIsLoggedIn={setIsLoggedIn} />
      </Modal>
    </>
  );
}

export default Navigation;

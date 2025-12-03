import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMenu } from "../../contexts/MenuContext";
import Modal from "../Modal";
import Test from "../Test";
import NavAuth from "./NavAuth";

function Navigation() {
  const { setIsLoggedIn } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const location = useLocation();
  const path = location.pathname;
  const login = useRef<HTMLDialogElement>(null);

  return (
    <>
      <nav
        className={`  "text-center flex flex-col md:flex md:flex-row gap-4  h-full md:justify-between md:w-full md:ml-24 md:items-center text-sm`}
      >
        {/* MOBILE*/}

        {/* <div className="md:hidden top-10 left-0 absolute flex md:flex-row flex-col justify-between bg-white w-screen h-[calc(100dvh-40px)] text-xl text-left t-0"></div> */}

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
                onClick={() => setIsMenuOpen(false)}
                to="/"
                className={path === "/" ? "bg-accent-blue" : ""}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to="/dashboard"
                className={path === "/dashboard" ? "bg-accent-blue" : ""}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to="applications"
                className={path === "/applications" ? "" : ""}
              >
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to="interviews"
                className={path === "/interviews" ? "" : ""}
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
                className={path === "/dashboard" ? "bg-accent-blue" : ""}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="applications"
                className={path === "/applications" ? "" : ""}
              >
                Applications
              </NavLink>
            </li>
            <li>
              <NavLink
                to="interviews"
                className={path === "/interviews" ? "" : ""}
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

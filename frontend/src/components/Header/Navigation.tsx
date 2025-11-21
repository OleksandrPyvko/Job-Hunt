import { NavLink, useLocation } from "react-router-dom";
import NavAuth from "./NavAuth";
import { useRef } from "react";
import Modal from "../Modal";
import Test from "../Test";
import { useAuth } from "../../contexts/AuthContext";
import { useMenu } from "../../contexts/MenuContext";

function Navigation() {
  const { setIsLoggedIn } = useAuth();
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  const location = useLocation();
  const path = location.pathname;
  const login = useRef<HTMLDialogElement>(null);

  return (
    <>
      <nav
        className={`  "text-center  flex flex-col md:flex md:flex-row gap-4  h-full md:justify-between md:w-full md:ml-24 md:items-center text-sm`}
      >
        {/* MOBILE*/}

        {/* <div className=" md:hidden text-xl text-left md:flex-row absolute top-10  left-0 t-0 h-[calc(100dvh-40px)] w-screen  bg-white flex flex-col justify-between"></div> */}

        <div
          className={` ${
            !isMenuOpen
              ? " left-[-100%] opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          } duration-500 ease-in-out bg-white  md:hidden text-xl text-left md:flex-row absolute top-10  left-0 t-0 h-[calc(100dvh-40px)] w-screen  overflow-hidden flex flex-col justify-between`}
        >
          <ul className="flex flex-col justify-center pl-10 py-10 gap-6">
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
          <div className="flex items-center justify-center py-14">
            <NavAuth login={login} />
          </div>
        </div>

        {/* DESkTOP */}

        <div className="hidden  md:flex md:justify-between md:w-full items-center">
          <ul className="md:flex gap-12 items-center text-lg md:flex-row">
            <li>
              <NavLink to="/" className={path === "/" ? "bg-accent-blue" : ""}>
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
            {/* <li>
            <NavLink to="analytics" className={path === "/analytics" ? "" : ""}>
            Analytics
            </NavLink>
          </li> */}
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

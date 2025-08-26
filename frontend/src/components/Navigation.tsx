import { NavLink, useLocation } from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav>
      <ul className={classes["nav-list"]}>
        <li>
          <NavLink
            to="/"
            className={path === "/" ? classes["link-active"] : ""}
          >
            🏠 &nbsp; Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="applications"
            className={path === "/applications" ? classes["link-active"] : ""}
          >
            🈸 &nbsp; Applications
          </NavLink>
        </li>
        <li>
          <NavLink
            to="interviews"
            className={path === "/interviews" ? classes["link-active"] : ""}
          >
            🎤 &nbsp; Interviews{" "}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="analytics"
            className={path === "/analytics" ? classes["link-active"] : ""}
          >
            📉 &nbsp; Analytics{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

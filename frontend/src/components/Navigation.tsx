import { NavLink, useLocation } from "react-router-dom";
import classes from "./Navigation.module.css";

function Navigation() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav>
      
      <ul className={classes["nav-list"]}>
        <li className={path === "/" ? classes["link-active"] : ""}>
          <NavLink to="/" className={classes.full}>
            Dashboard
          </NavLink>
        </li>
        <li className={path === "/applications" ? classes["link-active"] : ""}>
          <NavLink to="applications" className={classes.full}>
            {" "}
            Applications{" "}
          </NavLink>
        </li>
        <li className={path === "/interviews" ? classes["link-active"] : ""}>
          <NavLink to="interviews" className={classes.full}>
            Interviews{" "}
          </NavLink>
        </li>
        <li className={path === "/analytics" ? classes["link-active"] : ""}>
          <NavLink to="analytics" className={classes.full}>
            Analytics{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

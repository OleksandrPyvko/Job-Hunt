import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import classes from "./RootLayout.module.css";

function RootLayout() {
  return (
    <div className={classes.layout}>
      <div className={classes.content}>
        <Sidebar />
        <div className={classes.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;

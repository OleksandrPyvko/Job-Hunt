import classes from "./Sidebar.module.css";
import Modal from "../components/Modal";
import Button from "../UI/Button";
import Navigation from "../components/Navigation";

import { useEffect, useRef, useState } from "react";
// import { jwtDecode } from "jwt-decode";
import Test from "../components/Test";
import { useAuth } from "../context";

// type MyJWTPayload = {
//   username?: string;
//   id?: string;
// };

function Sidebar() {
  const { tokenData, setIsLoggedIn, isLoggedIn } = useAuth();
  const login = useRef<HTMLDialogElement>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const token = localStorage.getItem("token");
  // const tokenData = token ? jwtDecode<MyJWTPayload>(token) : {};

  // console.log('token is', token);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  // useEffect(() => {
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  return (
    <aside className={classes.sidebar}>
      <h2>Job Hunt Companion</h2>
      <p>{tokenData && tokenData.username}</p>
      <Navigation />
      <Modal ref={login} onClose={() => login.current?.close()}>
        <Test ref={login} setIsLoggedIn={setIsLoggedIn} />
      </Modal>

      {isLoggedIn === false ? (
        <Button
          className={classes.authButton}
          onClick={() => login.current?.showModal()}
        >
          Login
        </Button>
      ) : (
        <Button className={classes.logoutButton} onClick={handleLogout}>
          Logout
        </Button>
      )}
    </aside>
  );
}

export default Sidebar;

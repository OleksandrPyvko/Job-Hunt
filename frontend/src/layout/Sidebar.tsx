import classes from "./Sidebar.module.css";
import Modal from "../components/Modal";
import Button from "../UI/Button";
import Navigation from "../components/Navigation";

import Test from "../components/Test";

import { useEffect, useRef } from "react";
import { useAuth } from "../context";

function Sidebar() {
  const { tokenData, setIsLoggedIn, isLoggedIn, token } = useAuth();
  const login = useRef<HTMLDialogElement>(null);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, token]);

  return (
    <aside className={classes.sidebar}>
      <h2>Job Hunt</h2>
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

import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

function NavAuth({
  login,
}: {
  login: React.RefObject<HTMLDialogElement | null>;
}) {
  const { setIsLoggedIn, isLoggedIn, token } = useAuth();

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
    <>
      {isLoggedIn === false ? (
        <button
          className="bg-blue-500 cursor-pointer rounded-lg h-12 shadow-md  md:h-10 hover:drop-shadow-xl/25 hover:bg-sky-400 md:w-20 text-amber-50 w-[90%] my-auto"
          onClick={() => login.current?.showModal()}
        >
          Log in
        </button>
      ) : (
        <button
          className=" bg-(--page-bg) cursor-pointer hover:drop-shadow-xl/25  rounded-lg h-12  outline md:h-10 outline-gray-500/50 w-[90%] md:w-20  "
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </>
  );
}

export default NavAuth;

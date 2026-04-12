import { useRef, useState } from "react";

import Button from "../UI/Button";
import { loginUser, registerUser } from "../api/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const labelStyle =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const inputStyle =
  "w-[100%] px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500";

type UserType = {
  username: string;
  email: string;
  password: string;
};


function LoginPage() {
  const { setIsLoggedIn } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Test1234");

  const navigate = useNavigate();

  //   const signupFormRef = useRef<HTMLFormElement | null>(null);

//   async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     e.preventDefault();
//     const fd = new FormData(e.currentTarget);

//     const newUser: UserType = {
//       username: fd.get("username") as string,
//       email: fd.get("email") as string,
//       password: fd.get("password") as string,
//     };

//     try {
//       await registerUser(newUser);
//       //   signupFormRef.current?.reset();
//       //   ref.current?.close();
//     } catch (e) {
//       console.error(e);
//     }
//   }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        // ref.current?.close();
        setIsLoggedIn(true);
        navigate("/");
        setEmail("");
        setPassword("");
      } else {
        setError(res.message || "Login failed");
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[calc(100dvh-72px)] flex flex-col items-center justify-center ">
      {/* // <div className="bg-neutral-600"> */}
      {/* <div>
        <h2>Sign up</h2>
        <form id="signup" ref={signupFormRef} onSubmit={handleSignup}>
        <label htmlFor="">Username</label>
        <input required name="username" type="text" disabled={isLogin} />
        <label htmlFor="">Email</label>
        <input required name="email" type="email" disabled={isLogin} />
        <label htmlFor="">Password</label>
        <input
        required
        minLength={8}
        name="password"
        type="password"
        disabled={isLogin}
        />
        </form>
        
        <div>
        <Button form="signup" type="submit" disabled={isLogin}>
        Sign up
        </Button>
        <p>
        Already have an account?{" "}
        <button
        type="button"
        disabled={isLogin}
        onClick={() => setIsLogin(!isLogin)}
        >
        Log in
        </button>
        </p>
        </div>
        </div> */}
      {/* <div>
        <div>
        <img src="/desk-3139127_1280.jpg" alt="Desk" />
        </div>
        </div> */}

      {/* <div className="flex flex-col "> */}

      <div className="flex flex-col pt-12 pb-20 gap-6 bg-indigo-50 dark:bg-neutral-900  rounded-lg shadow-lg  w-full">
        <form
          className="px-3  w-full space-y-4 "
          id="login"
          onSubmit={handleLogin}
        >
          <h2 className="font-black text-2xl text-center">Login</h2>
          <label className={labelStyle} htmlFor="">
            Email
          </label>
          <input
            type="email"
            disabled={!isLogin}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={inputStyle}
          />
          <label className={labelStyle} htmlFor="password">
            Password
          </label>
          <input
            value={password}
            type="password"
            disabled={!isLogin}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className={inputStyle}
          />
        </form>
        <p className="px-3 text-red-500">{error}</p>
        <div className="flex flex-col">
          <Button
            form="login"
            type="submit"
            disabled={!isLogin}
            className="flex-1 mx-3 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <p className="px-3 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              disabled={!isLogin && loading}
              className="text-sky-400"
            >
              Sign up now!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

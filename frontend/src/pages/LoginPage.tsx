import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../api/http";

import Button from "../UI/Button";

const labelStyle =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const inputStyle =
  "w-[100%] px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500";

function LoginPage() {
  const { token, setIsLoggedIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Test1234");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
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

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-[calc(100dvh-72px)] mx-auto max-w-96 flex flex-col items-center justify-center ">
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
            className="flex-1 mx-3  bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <p className="px-3 mt-6  ">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-sky-400 ">
              Sign up now!
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

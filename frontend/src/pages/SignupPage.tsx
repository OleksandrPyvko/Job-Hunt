import { useRef } from "react";
import { registerUser } from "../api/http";
import Button from "../UI/Button";
import { NavLink, useNavigate } from "react-router-dom";

const labelStyle =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

const inputStyle =
  "w-[100%] px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500";

type UserType = {
  username: string;
  email: string;
  password: string;
};

function SignUpPage() {
  const signupFormRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const newUser: UserType = {
      username: fd.get("username") as string,
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    };

    try {
      await registerUser(newUser);
      signupFormRef.current?.reset();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="h-[calc(100dvh-72px)] mx-auto max-w-96 flex flex-col items-center justify-center ">
      <div className="flex flex-col pt-12 pb-20 gap-6 bg-indigo-50 dark:bg-neutral-900  rounded-lg shadow-lg  w-full">
        <form
          id="signup"
          ref={signupFormRef}
          onSubmit={handleSignup}
          className="px-3  w-full space-y-4"
        >
          <h2 className="font-black text-2xl text-center">Sign up</h2>
          <label className={labelStyle} htmlFor="username">
            Username
          </label>
          <input required name="username" type="text" className={inputStyle} />
          <label className={labelStyle} htmlFor="email">
            Email
          </label>
          <input required name="email" type="email" className={inputStyle} />
          <label className={labelStyle} htmlFor="password">
            Password
          </label>
          <input
            required
            minLength={8}
            name="password"
            type="password"
            className={inputStyle}
          />
        </form>

        <div className="flex flex-col  ">
          <Button
            form="signup"
            type="submit"
            className="flex-1 mx-3  bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Sign up
          </Button>
          <p className="px-3 mt-6 ">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-sky-400 hover:text-sky-500"
              type="button"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

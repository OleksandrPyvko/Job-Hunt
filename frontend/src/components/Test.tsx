import { useRef, useState } from "react";

import Button from "../UI/Button";
import { loginUser, registerUser } from "../api/http";
import classes from "./Test.module.css";
import { useNavigate } from "react-router-dom";

type UserType = {
  username: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLDialogElement | null>;
};

function Test({ ref, setIsLoggedIn }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("Test1234");

  const navigate = useNavigate();

  const signupFormRef = useRef<HTMLFormElement | null>(null);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      ref.current?.close();
    } catch (e) {
      console.error(e);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        ref.current?.close();
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
    <div className={classes.mainContainer}>
      <div
        className={`${classes.formContainer} ${
          isLogin ? classes.hidden : classes.visible
        }`}
      >
        <h2 className={classes['auth-h2']}>Sign up</h2>
        <form className={classes.form} id="signup" ref={signupFormRef} onSubmit={handleSignup}>
          <label className={classes['auth-label']} htmlFor="">Username</label>
          <input className={classes['auth-input']} required name="username" type="text" disabled={isLogin} />
          <label className={classes['auth-label']} htmlFor="">Email</label>
          <input className={classes['auth-input']} required name="email" type="email" disabled={isLogin} />
          <label className={classes['auth-label']} htmlFor="">Password</label>
          <input className={classes['auth-input']}
            required
            minLength={8}
            name="password"
            type="password"
            disabled={isLogin}
          />
        </form>

        <div>
          <Button
            form="signup"
            type="submit"
            disabled={isLogin}
            className={`${classes.signupButton} ${
              isLogin ? classes.disabled : ""
            }`}
          >
            Sign up
          </Button>
          <p className={classes['auth-p']}>
            Already have an account?{" "}
            <button
              type="button"
              disabled={isLogin}
              onClick={() => setIsLogin(!isLogin)}
              className={`${classes.switch} ${isLogin ? classes.disabled : ""}`}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
      <div className={classes.absolute}>
        <div
          className={`${classes.imageContainer} ${
            isLogin ? classes.moveLeft : classes.moveRight
          }`}
        >
          <img
            src="/desk-3139127_1280.jpg"
            alt="Desk"
            className={`${classes.img} ${isLogin ? classes.imageLeft : ""}`}
          />
        </div>
      </div>

      <div
        className={`${classes.formContainer} ${
          !isLogin ? classes.hidden : classes.visible
        }`}
      >
        <h2>Login</h2>
        <form className={classes.form} id="login" onSubmit={handleLogin}>
          <label className={classes['auth-label']} htmlFor="">Email</label>
          <input className={classes['auth-input']}
            type="email"
            disabled={!isLogin}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            
          />
          <label className={classes['auth-label']} htmlFor="">Password</label>
          <input className={classes['auth-input']}
            value={password}
            
            type="password"
            disabled={!isLogin}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </form>
        <p className={classes.error}>{error}</p>
        <div>
          <Button
            form="login"
            type="submit"
            disabled={!isLogin}
            className={`${classes.loginButton} ${
              !isLogin ? classes.disabled : ""
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <p className={classes['auth-p']}>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              disabled={!isLogin && loading}
              className={`${classes.switch} ${isLogin ? "" : classes.disabled}`}
            >
              Sign up now!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Test;

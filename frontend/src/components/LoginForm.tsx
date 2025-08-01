import { useState } from "react";
import { loginUser } from "../api/http";
import Button from "../UI/Button";
import classes from "./Test.module.css";

type PropsType = {
  ref?: React.RefObject<HTMLDialogElement | null>;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
};

export default function LoginForm({ ref, isLogin, setIsLogin }: PropsType) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);

        if (ref) {
          ref.current?.close();
        }
      } else {
        setError(res.message || "Login failed");
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${classes.formContainer} ${
        !isLogin ? classes.hidden : classes.visible
      }`}
    >
      <h2>Login</h2>
      <form action="">
        <label htmlFor="">Email</label>
        <input type="email" disabled={!isLogin} />
        <label htmlFor="">Password</label>
        <input type="password" disabled={!isLogin} />
      </form>
      <div>
        <Button className={classes.loginButton}>Log in</Button>
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={!isLogin}
            className={classes.switch}
          >
            Sign up now!
          </button>
        </p>
      </div>
    </div>
  );
}

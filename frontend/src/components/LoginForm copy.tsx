import { useState } from "react";
import { loginUser } from "../api/http";
import Button from "../UI/Button";
import classes from "./LoginForm.module.css";
import bg from '../../public/desk-3139127_1280.jpg'

type PropsType = {
  ref: React.RefObject<HTMLDialogElement | null>;
};

export default function LoginForm({ ref }: PropsType) {
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
        ref.current?.close();
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
    <div className={classes.container}>
      <div className={classes['image-container']}>
        <img src={bg} alt="" />
      </div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
        </div>
  );
}

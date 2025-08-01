import { useRef, type FormEvent } from "react";
import { registerUser } from "../api/http";

type UserType = {
  username: string;
  email: string;
  password: string;
};

interface PropsType {
  ref: React.RefObject<HTMLDialogElement | null>;
}

function SignupForm({ ref }: PropsType) {
  const signupFormRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

  return <form onSubmit={handleSubmit} ref={signupFormRef}>
    <label htmlFor="username">Username</label>
    <input type="text" id="username" name='username' />

    <label htmlFor="email">Email</label>
    <input type="text" id="email" name='email' />

    <label htmlFor="password">Password</label>
    <input type="password" id="password" name='password' />
    <button type='submit'>Submit</button>
  </form>;
}

export default SignupForm;

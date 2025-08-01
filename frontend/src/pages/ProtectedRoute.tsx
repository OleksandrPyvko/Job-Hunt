import type { ReactNode } from "react";
import { useAuth } from "../context";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // const token = localStorage.getItem("token");
  const { token } = useAuth();
  if (!token) {
    return <p>Log in or sign up to start using this app</p>;
  }
  return <>{children}</>;
}

{
  /* <Navigate to="/login" replace />; */
}

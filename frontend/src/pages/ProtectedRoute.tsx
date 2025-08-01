import type { ReactNode } from "react";
import { useAuth } from "../context";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // const token = localStorage.getItem("token");
  const { token } = useAuth();
  if (!token) {
    return <p>You have to be logged in to use these features</p>;
  }
  return <>{children}</>;
}

{
  /* <Navigate to="/login" replace />; */
}

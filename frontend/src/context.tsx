import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

type MyJWTPayload = {
  username?: string;
  id?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  tokenData: MyJWTPayload | null;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const tokenData = token ? jwtDecode<MyJWTPayload>(token) : {};

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      setIsLoggedIn: setIsLoggedIn,
      tokenData: tokenData,
      token: token,
    }}>{children}</AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  };
  return context;
}
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { MenuContext } from "./MenuContext";
import type { MyJWTPayload } from "../types/types";

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const tokenData = token ? jwtDecode<MyJWTPayload>(token) : {};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        tokenData: tokenData,
        token: token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function MenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: isMenuOpen,
        setIsMenuOpen: setIsMenuOpen,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

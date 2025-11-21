import { createContext, useContext } from "react";

export type MenuContextType = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<MenuContextType | null>(null);

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useAuth must be used within an MenuContextProvider");
  }
  return context;
}

export type ApplicationType = {
  _id?: string;
  company: string;
  status: "applied" | "interview" | "offer" | "rejected";
  position: string;
  location: string;
  applied: string;
  interview?: string | null;
  notes?: string;
};

export type MyJWTPayload = {
  username?: string;
  id?: string;
  userId?: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  tokenData: MyJWTPayload | null;
  token: string | null;
  userId?: string | undefined;
};



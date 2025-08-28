export type ApplicationType = {
  _id?: string;
  company: string;
  status: "applied" | "interview" | "offer" | "rejected";
  position: string;
  location: string;
  applied: string;
  interview?: string;
  notes?: string;
};

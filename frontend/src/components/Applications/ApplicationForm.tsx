import { useRef, type FormEvent } from "react";
import classes from "./ApplicationForm.module.css";
import addApplication from "../../api/http";
import { jwtDecode } from "jwt-decode";
import { useQueryClient } from "@tanstack/react-query";

interface Application {
  company: string;
  status: "applied" | "interview" | "offer" | "rejected";
  position: string;
  location: string;
  applied: string;
  notes: string;
  userId: string;
}

interface FormProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

type MyJWTPayload = {
  username?: string;
  userId?: string;
};

function ApplicationForm({ ref }: FormProps) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement | null>(null);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const token = localStorage.getItem("token");
  const tokenData = token ? jwtDecode<MyJWTPayload>(token) : {};

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const application: Application = {
      company: fd.get("company") as string,
      status: fd.get("status") as Application["status"],
      position: fd.get("position") as string,
      location: fd.get("location") as string,
      applied: fd.get("applied") as string,
      notes: fd.get("notes") as string,
      userId: tokenData.userId as string,
    };

    try {
      await addApplication(application);
      formRef.current?.reset();
      ref.current?.close();
    } catch (e) {
      console.error(e);
    }
    queryClient.invalidateQueries({ queryKey: ["userApplications"] });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={classes["application-form"]}
    >
      <label>Company</label>
      <input name="company" type="text" />
      <label>Status</label>
      <select name="status" id="">
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <label>Position</label>
      <input name="position" type="text" />
      <label>Location</label>
      <input name="location" type="text" />
      <label>Applied on</label>
      <input name="applied" defaultValue={formattedDate} type="date" />
      <label>Notes</label>
      <textarea name="notes" />
      <button type="submit">ADD</button>
    </form>
  );
}

export default ApplicationForm;

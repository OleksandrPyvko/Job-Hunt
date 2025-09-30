import { useRef, useState, type FormEvent } from "react";
import classes from "./ApplicationForm.module.css";
import addApplication from "../../api/http";
import { useQueryClient } from "@tanstack/react-query";
import type { ApplicationType } from "../../types/types";
import { useAuth } from "../../context";

interface FormProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

function ApplicationForm({ ref }: FormProps) {
  const [isInterview, setIsInterview] = useState(false);
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { tokenData } = useAuth();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const application: ApplicationType & { userId: string } = {
      company: fd.get("company") as string,
      status: fd.get("status") as ApplicationType["status"],
      position: fd.get("position") as string,
      location: fd.get("location") as string,
      applied: fd.get("applied") as string,
      notes: fd.get("notes") as string,
      userId: tokenData!.userId as string,
    };

    try {
      await addApplication(application);
      formRef.current?.reset();
      ref.current?.close();
    } catch (e) {
      console.error(e);
    } finally {
      setIsInterview(false);
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
      <input required name="company" type="text" />
      <label>Status</label>
      <select
        name="status"
        id=""
        onChange={(e) => setIsInterview(e.target.value === "interview")}
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>

      {isInterview && (
        <>
          <label>Interview on</label>
          <input name="interview" type="datetime-local" />
        </>
      )}
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

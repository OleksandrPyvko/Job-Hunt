import { useRef, useState, type FormEvent } from "react";
import classes from "./ApplicationForm.module.css";
import addApplication from "../../api/http";
import { useQueryClient } from "@tanstack/react-query";
import type { ApplicationType } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";

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
      <div>
        <h3>Company information:</h3>
        <label htmlFor="company">Company</label>
        <input id="company" required name="company" type="text" />

        <label>Position</label>
        <input name="position" type="text" />

        <label>Location</label>
        <input name="location" type="text" />
      </div>

      <div>
        <h3>Application details:</h3>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
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

        <label>Applied on</label>
        <input name="applied" defaultValue={formattedDate} type="date" />
      </div>

      <div>
        <label>Notes</label>
        <textarea name="notes" />
      </div>
      <button type="submit">ADD</button>
    </form>
  );
}

export default ApplicationForm;

import { useRef, useState, type FormEvent } from "react";
import type { ApplicationType } from "../../types/types";
import { useAuth } from "../../context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplicationById, updateApplication } from "../../api/http";

type Props = {
  applicationId: string;
  ref: React.RefObject<HTMLDialogElement>;
};

function UpdateApplicationForm({ ref, applicationId }: Props) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isInterview, setIsInterview] = useState(false);

  const formattedDate = new Date().toISOString().split("T")[0];

  const { data, isPending, error } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => getApplicationById(applicationId),
  });

  const { mutate } = useMutation({
    mutationFn: ({
      id,
      updatedApplication,
    }: {
      id: string;
      updatedApplication: ApplicationType;
    }) => updateApplication(id, updatedApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userApplications"],
      });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const updatedApplication: ApplicationType = {
      company: fd.get("company") as string,
      status: fd.get("status") as ApplicationType["status"],
      position: fd.get("position") as string,
      location: fd.get("location") as string,
      applied: fd.get("applied") as string,
      interview: fd.get("interview")
        ? (() => {
            const interviewValue = fd.get("interview");
            if (typeof interviewValue === "string") {
              const [datePart] = interviewValue.split("T");
              const [year, month, day] = datePart.split("-");
              const timePart = interviewValue.split("T")[1] || "00:00";
              return `${timePart} | ${day}/${month}/${year.slice(-2)} `;
            }
            return null;
          })()
        : null,
      notes: fd.get("notes") as string,
    };

    console.log("Updated Application:", updatedApplication);

    mutate({ id: applicationId, updatedApplication });
    ref.current?.close();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>Company</label>
      <input name="company" type="text" defaultValue={data.company} />
      <label>Status</label>
      <select
        name="status"
        id=""
        defaultValue={data.status}
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
          <input
            name="interview"
            defaultValue={data.interview}
            type="datetime-local"
          />
        </>
      )}

      <label>Position</label>
      <input name="position" type="text" defaultValue={data.position} />
      <label>Location</label>
      <input name="location" type="text" defaultValue={data.location} />
      <label>Applied on</label>
      <input name="applied" defaultValue={formattedDate} type="date" />
      <label>Notes</label>
      <textarea name="notes" defaultValue={data.notes} />
      <button type="submit">Confirm</button>
    </form>
  );
}

export default UpdateApplicationForm;

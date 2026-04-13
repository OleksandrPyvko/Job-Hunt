import { useState, type FormEvent } from "react";
import type { ApplicationType } from "../../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplicationById, updateApplication } from "../../api/http";

const inputStyles =
  "w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500";

const labelStyles =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

type Props = {
  applicationId: string;
  ref: React.RefObject<HTMLDialogElement>;
};

function UpdateApplicationForm({ applicationId }: Props) {
  const queryClient = useQueryClient();
  const [isInterview, setIsInterview] = useState<boolean>(false);

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

    mutate({ id: applicationId, updatedApplication });
    const popover = document.getElementById("updateApplicationPopover");
    popover?.hidePopover?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-indigo-50 dark:bg-neutral-900 p-6 rounded-lg shadow-lg space-y-4 min-w-96"
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Company
      </label>
      <input
        className={inputStyles}
        name="company"
        type="text"
        defaultValue={data.company}
      />
      <label className={labelStyles}>Status</label>
      <select
        className={inputStyles}
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

      {(isInterview || data.status === "interview") && (
        <>
          <label className={labelStyles}>Interview on</label>
          <input
            className={inputStyles}
            name="interview"
            defaultValue={data.interview}
            type="datetime-local"
          />
        </>
      )}

      <label className={labelStyles}>Position</label>
      <input
        className={inputStyles}
        name="position"
        type="text"
        defaultValue={data.position}
      />
      <label className={labelStyles}>Location</label>
      <input
        className={inputStyles}
        name="location"
        type="text"
        defaultValue={data.location}
      />
      <label className={labelStyles}>Applied on</label>
      <input
        className={inputStyles}
        name="applied"
        defaultValue={formattedDate}
        type="date"
      />
      <div className="space-y-3">
        <label className={labelStyles}>Notes</label>
        <textarea
          className={inputStyles}
          name="notes"
          defaultValue={data.notes}
        />
      </div>
      <div className="flex ">
        <button
          popoverTarget="updateApplicationPopover"
          className="flex-1 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-colors"
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default UpdateApplicationForm;

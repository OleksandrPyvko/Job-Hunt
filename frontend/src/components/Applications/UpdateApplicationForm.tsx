import { useRef, useState, type FormEvent } from "react";
import type { ApplicationType } from "../../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplicationById, updateApplication } from "../../api/http";

type Props = {
  applicationId: string;
  ref: React.RefObject<HTMLDialogElement>;
};

function UpdateApplicationForm({ ref, applicationId }: Props) {
  const queryClient = useQueryClient();
  // const formRef = useRef<HTMLFormElement | null>(null);
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
    // ref.current?.close();
    const popover = document.getElementById("updateApplicationPopover");
    popover?.hidePopover?.();
  }

  return (
    <form
      // ref={formRef}
      onSubmit={handleSubmit}
      className="bg-indigo-50 dark:bg-neutral-900 p-6 rounded-lg shadow-lg space-y-4 min-w-96"
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Company
      </label>
      <input
        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        name="company"
        type="text"
        defaultValue={data.company}
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
        Status
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
            Interview on
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            name="interview"
            defaultValue={data.interview}
            type="datetime-local"
          />
        </>
      )}

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
        Position
      </label>
      <input
        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        name="position"
        type="text"
        defaultValue={data.position}
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
        Location
      </label>
      <input
        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        name="location"
        type="text"
        defaultValue={data.location}
      />
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
        Applied on
      </label>
      <input
        className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        name="applied"
        defaultValue={formattedDate}
        type="date"
      />
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ">
          Notes
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
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

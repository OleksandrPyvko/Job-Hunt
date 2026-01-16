import { useRef, useState, type FormEvent } from "react";
import addApplication from "../../api/http";
import { useQueryClient } from "@tanstack/react-query";
import type { ApplicationType } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";

function AddApplicationForm() {
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

      const popover = document.getElementById("addApplicationPopover");
      popover?.hidePopover?.();
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
      className="bg-indigo-50 dark:bg-neutral-900 p-6 rounded-lg shadow-lg space-y-4 min-w-96"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Company information:
        </h3>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Company
          </label>
          <input
            id="company"
            required
            name="company"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Position
          </label>
          <input
            name="position"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <input
            name="location"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Application details:
        </h3>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            onChange={(e) => setIsInterview(e.target.value === "interview")}
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {isInterview && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interview on
            </label>
            <input
              name="interview"
              type="datetime-local"
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Applied on
          </label>
          <input
            name="applied"
            defaultValue={formattedDate}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold py-2 rounded-md transition-colors"
        >
          ADD
        </button>
        <button
          type="button"
          popoverTargetAction="hide"
          popoverTarget="addApplicationPopover"
          className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddApplicationForm;

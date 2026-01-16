import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../api/http";
import type { ApplicationType } from "../../types/types";
import { useRef, useState } from "react";
import Modal from "../Modal";
import UpdateApplicationForm from "./UpdateApplicationForm";
import StatusBadge from "./StatusBadge";
import EditIcon from "../Icons/EditIcon";
import DeleteIcon from "../Icons/DeleteIcon";

interface ApplicationRowProps {
  application: ApplicationType;
  index: number;
  id: string;
}

function ApplicationCard({ application, id, index }: ApplicationRowProps) {
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  const dialog = useRef<HTMLDialogElement | null>(null);

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userApplications"],
      });
    },
  });

  async function handleDeletion(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this application?"
    );
    if (!confirmed) return;
    deleteMutation(id);
  }

  async function handleUpdate() {
    dialog.current?.showModal();
  }

  return (
    <>
      <div className="max-w-[760px] mx-auto mb-4 p-4 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-150">
        <div className="flex gap-4 md:gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
              {application.company
                ? application.company.charAt(0).toUpperCase()
                : "?"}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-lg font-semibold leading-tight truncate">
                  {application.company}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 truncate">
                  {application.position}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {application.location}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Applied{" "}
                    {new Date(application.applied).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={application.status} />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpdate}
                    aria-label={`Edit application at ${application.company}`}
                    className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <EditIcon className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                  </button>
                  <button
                    onClick={() => handleDeletion(id!)}
                    aria-label={`Delete application at ${application.company}`}
                    className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <DeleteIcon className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>

            {application.notes !== "" && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Notes
                </h4>
                <div className="relative mt-1">
                  <p
                    className={`text-sm text-slate-700 dark:text-slate-300 leading-relaxed ${
                      expanded ? "" : "line-clamp-3"
                    }`}
                  >
                    {application.notes}
                  </p>
                  {!expanded &&
                    application.notes &&
                    application.notes.length > 160 && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/90 dark:from-slate-900/90" />
                    )}
                </div>
                {application.notes && application.notes.length > 160 && (
                  <button
                    className="mt-2 text-xs text-sky-600 dark:text-sky-400 font-medium"
                    onClick={() => setExpanded((s) => !s)}
                  >
                    {expanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal ref={dialog}>
        <UpdateApplicationForm ref={dialog} applicationId={id} />
      </Modal>
    </>
  );
}

export default ApplicationCard;

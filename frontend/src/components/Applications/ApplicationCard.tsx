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
      <div className=" outline outline-slate-500 max-w-[600px] mb-4 mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4  rounded shadow-sm">
        <div className="flex-1 min-w-0">
          <p className="text-lg font-semibold  truncate">
            {application.company}
          </p>
          <p className="text-sm text-gray-600 dark:text-slate-300 truncate">
            {application.position}
          </p>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {application.location}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          {application.notes !== "" && (
            <div className="mt-2 md:mt-0">
              <h4 className="text-sm font-medium text-gray-700">Notes</h4>
              <p
                className={`text-sm text-gray-700 dark:text-gray-400 mt-1 ${
                  expanded ? "" : "line-clamp-3"
                }`}
              >
                {application.notes}
              </p>
              {application.notes && application.notes.length > 180 && (
                <button
                  className="text-xs text-(--accent-blue) mt-1"
                  onClick={() => setExpanded((s) => !s)}
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={application.status} />
          <p className="text-xs text-gray-500">
            Applied {new Date(application.applied).toLocaleDateString("en-GB")}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleUpdate}
              aria-label={`Edit application at ${application.company}`}
              className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
            >
              <EditIcon className="w-4 h-4 " />
            </button>
            <button
              onClick={() => handleDeletion(id!)}
              aria-label={`Delete application at ${application.company}`}
              className="p-2 rounded-md hover:bg-red-200 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
            >
              <DeleteIcon className="w-4 h-4 text-red-600" />
            </button>
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

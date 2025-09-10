import classes from "./ApplicationsRow.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../api/http";
import type { ApplicationType } from "../../types/types";
import { useRef } from "react";
import Modal from "../Modal";
import UpdateApplicationForm from "./UpdateApplicationForm";

interface ApplicationRowProps {
  application: ApplicationType;
  index: number;
  id: string;
}

function ApplicationsRow({ application, id, index }: ApplicationRowProps) {
  const queryClient = useQueryClient();
  const isOdd = index % 2 !== 0;
  const dialog = useRef<HTMLDialogElement | null>(null);

  let status;
  switch (application.status) {
   
    case "interview":
      status = classes.interview;
      break;
    case "offer":
      status = classes.offer;
      break;
    case "rejected":
      status = classes.rejected;
      break;
    default:
      status = "";
  }

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
      <tr className={`${classes.row} ${!isOdd ? classes.darker : ""}`}>
        <td>{application.company}</td>
        <td className={status}>{application.status}</td>
        <td>{application.position}</td>
        <td>{application.location}</td>
        <td className={classes.date}>
          {new Date(application.applied).toLocaleDateString("en-GB")}
        </td>
        <td className={classes.date}>{application.interview}</td>

        <td className={classes.notes}>{application?.notes}</td>

        <td>
          <button className={classes["action-button"]} onClick={handleUpdate}>
            <img
              src="/edit.svg"
              className={classes["action-icon"]}
              alt="edit"
            />
          </button>
          <button
            onClick={() => handleDeletion(id!)}
            className={classes["action-button"]}
          >
            <img
              src="/delete.svg"
              className={classes["action-icon"]}
              alt="delete"
            />
          </button>
        </td>
      </tr>
      <Modal ref={dialog}>
        <UpdateApplicationForm ref={dialog} applicationId={id} />
      </Modal>
    </>
  );
}

export default ApplicationsRow;


<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis autem quam repellat eveniet illum? Sed rerum suscipit dolorum, cupiditate quidem est culpa voluptatibus at quibusdam dolore facere, nam quae non?</p>
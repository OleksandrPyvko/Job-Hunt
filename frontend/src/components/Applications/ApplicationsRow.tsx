import classes from "./ApplicationsRow.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication, updateApplication } from "../../api/http";
import type { ApplicationType } from "../../types/types";
import { useRef } from "react";
import Modal from "../Modal";
import UpdateApplicationForm from "./UpdateApplicationForm";

// interface ApplicationProps {
//   _id: string;
//   company: string;
//   status: string;
//   position: string;
//   location: string;
//   applied: string;
//   interview?: string | null;
//   notes?: string;
// }

interface ApplicationRowProps {
  application: ApplicationType;
  index: number;
  id: string;
}

function ApplicationsRow({ application, id, index }: ApplicationRowProps) {
  const queryClient = useQueryClient();
  const isOdd = index % 2 !== 0;
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
    deleteMutation(id);
  }

  async function handleUpdate() {
    dialog.current?.showModal();
  }


  return (
    <>
      <tr className={`${classes.row} ${!isOdd ? classes.darker : ""}`}>
        <td>{application.company}</td>
        <td>{application.status}</td>
        <td>{application.position}</td>
        <td>{application.location}</td>
        <td>{new Date(application.applied).toLocaleDateString("en-GB")}</td>
        <td>{application.interview}</td>
        
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
        <UpdateApplicationForm applicationId={id } />
      </Modal>
    </>
  );
}

export default ApplicationsRow;

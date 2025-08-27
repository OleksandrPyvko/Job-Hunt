import classes from "./ApplicationsRow.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication, updateApplication } from "../../api/http";

interface ApplicationProps {
  _id: string;
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string | null;
  notes?: string;
}

interface ApplicationRowProps {
  application: ApplicationProps;
  index: number;
  id: string;
}

function ApplicationsRow({ application, id, index }: ApplicationRowProps) {
  const queryClient = useQueryClient();
  const isOdd = index % 2 !== 0;

  const { mutate: deleteMutation } = useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userApplications"],
      });
    },
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: ApplicationProps;
    }) => updateApplication(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userApplications"],
      });
    },
  });

  async function handleDeletion(id: string) {
    deleteMutation(id);
  }

  async function handleUpdate(id: string, updatedData: ApplicationProps) {
    updateMutation({ id, updatedData });
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
          <button className={classes["action-button"]}>
            <img
              src="/edit.svg"
              className={classes["action-icon"]}
              alt="edit"
            />
          </button>
          <button
            onClick={() => handleDeletion(id)}
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
    </>
  );
}

export default ApplicationsRow;

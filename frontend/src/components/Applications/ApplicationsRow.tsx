import { useState } from "react";
import classes from "./ApplicationsRow.module.css";

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
  onEdit: () => void;
  onDelete: () => void;
}

function ApplicationsRow({
  application,
  index,
  onEdit,
  onDelete,
}: ApplicationRowProps) {
  const isOdd = index % 2 !== 0;

  return (
    <>
      <tr className={`${classes.row} ${!isOdd ? classes.darker : ""}`}>
        <td>{application.company}</td>
        <td>{application.status}</td>
        <td>{application.position}</td>
        <td>{application.location}</td>
        <td>
          {new Date(application.applied).toLocaleDateString("en-GB")}
        </td>
        <td>{application.interview}</td>
        <td className={classes.notes}>{application?.notes}</td>

        <td>
          <button onClick={onEdit} className={classes["action-button"]}>
            <img src="/edit.svg" className={classes["action-icon"]} alt="edit" />
            
          </button>
          <button onClick={onDelete} className={classes["action-button"]}>
            <img src="/delete.svg" className={classes["action-icon"]} alt="delete" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default ApplicationsRow;

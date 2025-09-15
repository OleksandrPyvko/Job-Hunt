import type { ApplicationType } from "../../types/types";
import classes from "./UpcomingInterview.module.css";

function UpcomingInterview({ interview }: { interview?: ApplicationType }) {
  return (
    <div className={classes.container}>
      <p>{interview?.company}</p>
      <p>{interview?.position}</p>
      <p>{interview?.interview ? interview?.interview : "No time set yet"}</p>
    </div>
  );
}

export default UpcomingInterview;

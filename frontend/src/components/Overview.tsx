import classes from "./Overview.module.css";
import type { ApplicationType } from "../types/types";

type OverviewProps = {
  data: ApplicationType[];
};

function Overview({ data }: OverviewProps) {
  return (
    <>
      <div className={classes.grid}>
        <div className={classes.stat}>
          <p className={`${classes.bold}`}>Total applications:</p>
          <p>{data.length}</p>
        </div>
        <div className={classes.stat}>
          <p className={`${classes.bold} ${classes.offers}`}>Offers:</p>
          <p>{data.filter((a) => a.status === "offer").length}</p>
        </div>
        <div className={classes.stat}>
          <p className={`${classes.bold} ${classes.rejections}`}>
            Rejections:
          </p>
          <p>{data.filter((a) => a.status === "rejected").length}</p>
        </div>
        <div className={classes.stat}>
          <p className={`${classes.bold} ${classes.interviews}`}>
            Interviews:
          </p>
          <p>{data.filter((a) => a.status === "interview").length}</p>
        </div>
      </div>
    </>
  );
}

export default Overview;

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
          <h3 className={`${classes.bold}`}>Total applications:</h3>
          <p>{data.length}</p>
        </div>
        <div className={classes.stat}>
          <h3 className={`${classes.bold} ${classes.offers}`}>Offers:</h3>
          <p>{data.filter((a) => a.status === "offer").length}</p>
        </div>
        <div className={classes.stat}>
          <h3 className={`${classes.bold} ${classes.rejections}`}>
            Rejections:
          </h3>
          <p>{data.filter((a) => a.status === "rejected").length}</p>
        </div>
        <div className={classes.stat}>
          <h3 className={`${classes.bold} ${classes.interviews}`}>
            Interviews:
          </h3>
          <p>{data.filter((a) => a.status === "interview").length}</p>
        </div>
      </div>
    </>
  );
}

export default Overview;

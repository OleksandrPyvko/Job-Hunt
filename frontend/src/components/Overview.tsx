import { useEffect, useState } from "react";
import classes from "./Overview.module.css";
import { useAuth } from "../context";
import { getUserApplications } from "../api/http";
import type { ApplicationType } from "../types/types";

type OverviewProps = {
  data: ApplicationType[];
};

function Overview({ data }: OverviewProps) {
  const { tokenData } = useAuth();
  const [overviewData, setOverviewData] = useState({
    totalApplications: 0,
    offers: 0,
    rejections: 0,
    interviews: 0,
  });

  useEffect(() => {
    async function fetchOverviewData() {
      try {
        if (!tokenData?.userId) return;

        const data = await getUserApplications(tokenData.userId);
        setOverviewData({
          totalApplications: data.length,
          offers: data.filter((app) => app.status === "Offer").length,
          rejections: data.filter((app) => app.status === "Rejected").length,
          interviews: data.filter((app) => app.status === "Interview").length,
        });
      } catch (error) {
        console.error("Failed to fetch overview data:", error);
      }
    }

    fetchOverviewData();
  }, [tokenData]);
  return (
    <>
      <div className={classes.grid}>
        <div className={classes.stat}>
          <h3 className={`${classes.bold}`}>Total applications:</h3>
          <p>{data.length}</p>
        </div>
        <div className={classes.stat}>
          <h3 className={`${classes.bold} ${classes.offers}`}>Offers:</h3>
          <p>1</p>
        </div>
        <div className={classes.stat}>
          <h3 className={`${classes.bold} ${classes.rejections}`}>
            Rejections:
          </h3>
          <p>8</p>
        </div>
        <div className={classes.stat}>
          <h3 className={`${classes.bold} ${classes.interviews}`}>
            Interviews:
          </h3>
          <p>8</p>
        </div>
      </div>
    </>
  );
}

export default Overview;

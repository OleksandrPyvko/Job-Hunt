import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { getUserApplications } from "../../api/http";
import classes from "./RecentApplications.module.css";
import type { ApplicationType } from "../../types/types";

function RecentApplications() {
  const { tokenData } = useAuth();

  const { data } = useQuery<ApplicationType[]>({
    queryKey: ["application"],
    queryFn: async () => getUserApplications(tokenData?.userId || ""),
  });

  const recentApplications = data?.slice(-5).reverse();

  if (recentApplications?.length === 0)
    return (
      <div className={classes.container}>
        <h3 className={classes.title}>Upcoming interviews</h3>
        <p className={classes["empty-list"]}>No applications are added yet</p>
      </div>
    );

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Recent Application</h3>
      <div className={classes["applications-list"]}>
        <div className={classes["header-row"]}>
          <p>Company</p>
          <p>Position</p>
          <p>Status</p>
        </div>
        {recentApplications?.map((app) => (
          <div key={app._id} className={classes.application}>
            <p>{app.company}</p>
            <p>{app.position}</p>
            <p>{app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentApplications;

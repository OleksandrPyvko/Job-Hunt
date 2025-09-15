import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context";
import { getUserApplications } from "../../api/http";
import classes from "./RecentApplications.module.css";

function RecentApplications() {
  const { tokenData } = useAuth();

  const { data } = useQuery({
    queryKey: ["application"],
    queryFn: async () => getUserApplications(tokenData?.userId || ""),
  });

  const recentApplications = data?.slice(-5).reverse();

  return (
    <div>
      <h3>Recent Application</h3>
      <div className={classes["applications-list"]}>
        {recentApplications?.map((app) => (
          <div className={classes.application}>
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

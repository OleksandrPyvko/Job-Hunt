import ApplicationsRow from "./ApplicationsRow";
import classes from "./ApplicationsTable.module.css";
import { getUserApplications } from "../../api/http";
import { useAuth } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { SortData } from "../Filter/SortHelper";

function ApplicationsTable() {
  const { tokenData } = useAuth();
  const [searchParams] = useSearchParams();
  const sort = searchParams?.get("sort") || "all";
  const status = searchParams?.get("status") || "all";

  const { data, isPending } = useQuery({
    queryKey: ["userApplications"],
    queryFn: () => getUserApplications(tokenData?.userId || ""),
  });

  if (isPending) return <p>Loading...</p>;
  if (data?.length === 0)
    return (
      <div className={classes["empty-list"]}>
        No applications here for now. <br/> Start by adding one!
      </div>
    );

  const sortedData = SortData(data || [], sort, status);

  return (
    <div className={classes.tableContainer}>
      <table>
        <thead>
          <tr className={classes.tr}>
            <th>Company</th>
            <th>Status</th>
            <th>Position</th>
            <th>Location</th>
            <th>Applied</th>
            <th>Interview</th>
            <th className={classes.notes}>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {[...sortedData].reverse().map((application, index) => (
            <ApplicationsRow
              index={index}
              key={application._id}
              id={application._id}
              application={application}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationsTable;

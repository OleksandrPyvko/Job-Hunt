import ApplicationsRow from "./ApplicationsRow";
import classes from "./ApplicationsTable.module.css";
import { getUserApplications } from "../../api/http";
import { useAuth } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { SortData } from "../Filter/Helper";

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
  if (data?.length === 0) return <p>No data has been found</p>;

  const sortedData = SortData(data || [], sort, status);

  return (
    <>
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
          {sortedData?.map((application, index) => (
            <ApplicationsRow
              index={index}
              key={application._id}
              id={application._id}
              application={application}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ApplicationsTable;

import classes from "./Applications.module.css";
import ApplicationsTable from "../components/Applications/ApplicationsTable";
import Filter from "../components/Filter/Filter";
import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../api/http";
import { useAuth } from "../context";

// type ApplicationType = {
//   _id: string;
//   company: string;
//   status: string;
//   position: string;
//   location: string;
//   applied: string;
//   interview?: string | null;
//   notes?: string;
// };

function Applications() {
  const { tokenData } = useAuth();

  const { data, isPending, isError } = useQuery({
    queryKey: ["userApplications"],
    queryFn: () => getUserApplications(tokenData?.userId || ""),
  });

  if (isPending) return <p>Loading...</p>;
  if (data?.length === 0)
    return (
      <div className={classes["empty-list"]}>
        No applications here for now. <br /> Start by adding one!
      </div>
    );
  if (isError) return <p>Oops!</p>;

  return (
    <div className={classes.container}>
      <Filter />
      <ApplicationsTable data={data ?? []} />
    </div>
  );
}

export default Applications;

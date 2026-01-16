import { useSearchParams } from "react-router-dom";
import { SortData } from "../Filter/SortHelper";
import type { ApplicationType } from "../../types/types";
import ApplicationCard from "./ApplicationCard";

type PropsType = {
  data: ApplicationType[];
};

function ApplicationsList({ data }: PropsType) {
  const [searchParams] = useSearchParams();
  const sort = searchParams?.get("sort") || "all";
  const status = searchParams?.get("status") || "all";
  const sortedData = SortData(data || [], sort, status);

  return (
    <div>
      {[...sortedData].reverse().map((application, index) => (
        <ApplicationCard
          index={index}
          key={application._id}
          id={application._id}
          application={application}
        />
      ))}
    </div>
  );
}

export default ApplicationsList;

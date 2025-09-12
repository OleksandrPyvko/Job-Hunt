import type { ApplicationType } from "../../types/types";
import UpcomingInterview from "./UpcomingInterview";
import classes from "./UpcomingInterviews.module.css";

function UpcomingInterviews({ data }: { data?: ApplicationType[] }) {
  const upcomingInterviews: ApplicationType[] | undefined = data
    ?.filter((application) => application.status === "interview")
    .slice(0, 5);

  return (
    <div className={classes.container}>
        <h3>Upcoming interviews</h3>
      {upcomingInterviews?.map((interview) => (
        <UpcomingInterview key={interview._id} interview={interview} />
      ))}
    </div>
  );
}

export default UpcomingInterviews;

import type { ApplicationType } from "../../types/types";
import UpcomingInterview from "./UpcomingInterview";
import classes from "./UpcomingInterviews.module.css";

function UpcomingInterviews({ data }: { data?: ApplicationType[] }) {
  const upcomingInterviews: ApplicationType[] | undefined = data
    ?.filter((application) => application.status === "interview")
    .slice(0, 5);

  if (upcomingInterviews?.length === 0)
    return (
      <div className={classes.container}>
        <h3>Upcoming interviews</h3>
        <p>There are no interviews are planned yet</p>
      </div>
    );
  return (
    <div className={classes.container}>
      <h3>Upcoming interviews</h3>

      <div className={classes.header}>
        <p>Company</p>
        <p>Position</p>
        <p>Interview at</p>
      </div>
      {upcomingInterviews?.map((interview) => (
        <UpcomingInterview key={interview._id} interview={interview} />
      ))}
    </div>
  );
}

export default UpcomingInterviews;

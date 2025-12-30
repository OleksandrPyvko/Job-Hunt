import type { ApplicationType } from "../../types/types";
import UpcomingInterview from "./UpcomingInterview";


function UpcomingInterviews({ data }: { data?: ApplicationType[] }) {
  const upcomingInterviews: ApplicationType[] | undefined = data
    ?.filter((application) => application.status === "interview")
    .slice(0, 5);

  if (upcomingInterviews?.length === 0)
    return (
      <div className=''>
        <h3 className=''>Upcoming interviews</h3>
        <p className=''>No interviews are planned yet</p>
      </div>
    );
  return (
    <div className=''>
      <h3 className=''>Upcoming interviews</h3>

      <div className=''>
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

import type { ApplicationType } from "../../types/types";


function UpcomingInterview({ interview }: { interview?: ApplicationType }) {
  return (
    <div className=''>
      <p>{interview?.company}</p>
      <p>{interview?.position}</p>
      <p>{interview?.interview ? interview?.interview : "No time set yet"}</p>
    </div>
  );
}

export default UpcomingInterview;

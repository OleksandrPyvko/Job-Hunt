import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../contexts/AuthContext";
import { getUserApplications } from "../../api/http";

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
      <div >
        <h3 className=''>Upcoming interviews</h3>
        <p className=''>No applications are added yet</p>
      </div>
    );

  return (
    <div className=''>
      <h3 className=''>Recent Application</h3>
      <div className=''>
        <div className=''>
          <p>Company</p>
          <p>Position</p>
          <p>Status</p>
        </div>
        {recentApplications?.map((app) => (
          <div key={app._id} className=''>
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

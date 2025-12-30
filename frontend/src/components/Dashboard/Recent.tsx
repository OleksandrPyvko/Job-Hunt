import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../../api/http";
import { useAuth } from "../../contexts/AuthContext";
import RecentAppCard from "./RecentAppCard";
import type { ApplicationType } from "../../types/types";

function Recent() {
  const { tokenData } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUserApplications(tokenData?.userId || ""),
    queryKey: ["userApplications"],
  });

  const recentApplications = data?.slice(0, 3) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recent applications.</div>;
  if (!data || data.length === 0)
    return <div>No recent applications found.</div>;

  return (
    <div className="py-16 lg:py-16 ">
      <div className="text-center lg:text-left  mb-10">
        <p className="font-semibold">Recent</p>
        <h3 className="text-3xl font-semibold my-4">Your latest moves</h3>
        <p>The positions you've pursued this week.</p>
      </div>

      <div className="flex flex-col  gap-14 lg:gap-2 justify-center ">
        {recentApplications?.map((application: ApplicationType) => (
          <RecentAppCard key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
}

export default Recent;

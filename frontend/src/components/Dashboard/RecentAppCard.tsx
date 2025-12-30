import type { ApplicationType } from "../../types/types";

type RecentAppCardProps = {
  application: ApplicationType;
};

function RecentAppCard({ application }: RecentAppCardProps) {
  const formattedDate = new Date(application.applied).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="py-6 space-y-3 bg-neutral-900 px-8 rounded-lg">
      <p className="text-xl font-semibold">{application.position}</p>
      <p>Applied on: {formattedDate}</p>
      <div className="flex gap-4">
        <span className="px-4 py-1 font-bold rounded-md bg-(--darkgray) outline outline-neutral-600 ">
          {application.status}
        </span>
        {application.location && (
          <span className="px-4 py-1 font-bold rounded-md bg-(--darkgray) outline outline-neutral-600 ">
            {application.location}
          </span>
        )}
      </div>
    </div>
  );
}
export default RecentAppCard;

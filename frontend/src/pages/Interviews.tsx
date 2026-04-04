import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { getUserApplications } from "../api/http";
import CalendarIcon from "../components/Icons/CalendarIcon";
import type { ApplicationType } from "../types/types";
import { useState } from "react";

function Interviews() {
  const [expanded, setExpanded] = useState(false);
  const { tokenData } = useAuth();
  const { data } = useQuery<ApplicationType[]>({
    queryFn: () => getUserApplications(tokenData?.userId || ""),
    queryKey: ["userApplications"],
  });

  const interviews = data?.filter(
    (application) => application.status === "interview",
  );

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-[calc(100vh-80px)] pt-4">
      <div className="max-w-[760px] mx-auto">
        <h2 className="text-3xl font-semibold my-4">
          Your upcoming interviews
        </h2>
        {interviews?.map((application) => (
          <div
            key={application._id}
            className="mb-4 p-4 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg shadow-sm"
          >
            <p className="text-lg font-semibold">{application.company}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1 py-2">
              <CalendarIcon w={28} h={28} /> {application?.interview}
            </p>
            {application.notes && application.notes !== "" && (
              <div className="max-w-[75%] pt-2 text-neutral-600 text-sm dark:text-neutral-400">
                {application.notes && application.notes !== "" && `Notes: `}
                <br />
                {expanded === false ? (
                  <span className="line-clamp-2 ">{application.notes}</span>
                ) : (
                  <span className="">{application.notes}</span>
                )}

                {application.notes && application.notes.length > 120 && (
                  <p>
                    <button
                      className="mt-2 text-xs text-sky-600  dark:text-sky-400 font-medium"
                      onClick={() => setExpanded((prev) => !prev)}
                    >
                      {expanded ? "Show less" : "Show more"}
                    </button>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Interviews;

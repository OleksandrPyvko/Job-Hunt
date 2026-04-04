import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { getUserApplications } from "../api/http";
import ApplicationCard from "../components/Applications/ApplicationCard";
import InterviewCard from "../components/Interviews/InterviewCard";

function Interviews() {
  const { tokenData } = useAuth();
  const { data, isPending, isError } = useQuery({
    queryFn: () => getUserApplications(tokenData?.userId || ""),
    queryKey: ["userApplications"],
    enabled: !!tokenData?.userId,
  });

  const interviews =
    data?.filter((application) => application.status === "interview") || [];

  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <p className="text-slate-700 dark:text-slate-200">
          Loading interviews...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <p className="text-red-600 dark:text-red-400">
          Unable to load interviews.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pt-4 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-sky-600 font-semibold">
            Interviews
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
            Your upcoming interviews
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Review and manage interview-ready applications in a cohesive view.
          </p>
        </div>

        {interviews.length === 0 ? (
          <div className="rounded-3xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              No interviews scheduled yet
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Change an application status to{" "}
              <span className="font-semibold">interview</span> to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((application) => (
              <InterviewCard key={application._id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Interviews;

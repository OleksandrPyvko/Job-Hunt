import Filter from "../components/Filter/Filter";
import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../api/http";
import { useAuth } from "../contexts/AuthContext";
import ApplicationsList from "../components/Applications/ApplicationsList";
import ApplicationForm from "../components/Applications/ApplicationForm";

function Applications() {
  const { tokenData } = useAuth();

  const { data, isPending, isError } = useQuery({
    queryKey: ["userApplications"],
    queryFn: () => getUserApplications(tokenData?.userId || ""),
  });

  if (isPending) return <p>Loading...</p>;
  if (data?.length === 0)
    return (
      <div className="min-h-[calc(100vh-80px)] h-full flex flex-col items-center justify-center p-6 ">
        <div className="" />

        <div className="text-center space-y-6 z-10 ">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
              No Applications Yet
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Start tracking your job search journey by adding your first
              application!
            </p>
          </div>

          <button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            popoverTarget="addApplicationPopover"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Your First Application
          </button>
        </div>

        <div
          id="addApplicationPopover"
          popover="auto"
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-50 bg-white dark:bg-slate-900 opacity-100 starting:open:opacity-0 transition-all ease-in-out duration-500"
        >
          <ApplicationForm />
        </div>

        
        <div
          className="hidden [#addApplicationPopover:popover-open~&]:block fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
          aria-hidden
        />
      </div>
    );
  if (isError) return <p>Oops!</p>;

  return (
    <div className="min-h-[calc(100vh-80px)]">
      <Filter />
      <ApplicationsList data={data ?? []} />
    </div>
  );
}

export default Applications;

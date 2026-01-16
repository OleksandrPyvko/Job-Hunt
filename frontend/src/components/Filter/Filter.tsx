import { useSearchParams } from "react-router-dom";
import AddApplicationForm from "../Applications/ApplicationForm";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "all";
  const status = searchParams.get("status") || "all";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("status", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-[760px] mx-auto mb-6">
      <div className="bg-white/80 dark:bg-(--darkbg) border border-slate-200 dark:border-none rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex-1 w-full flex gap-3 md:gap-4 items-center">
          <div className="flex-1 min-w-0 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <label className="flex flex-col text-sm text-slate-600 dark:text-slate-300">
              <span className="mb-1">Sort</span>
              <select
                name="sort"
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className="rounded-md border border-slate-300 dark:border-neutral-700 px-3 py-2 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="all">All</option>
                <option value="date-desc">Date applied 🔻</option>
                <option value="date-asc">Date applied 🔺</option>
                <option value="company-desc">Company A-Z</option>
                <option value="company-asc">Company Z-A</option>
              </select>
            </label>

            <label className="flex flex-col text-sm text-slate-600 dark:text-slate-300">
              <span className="mb-1">Status</span>
              <select
                name="status"
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="rounded-md border border-slate-300 dark:border-neutral-700 px-3 py-2 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">All</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <button
            popoverTarget="addApplicationPopover"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-linear-to-br from-sky-500 to-indigo-600 text-white font-semibold shadow-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Add Application
          </button>
        </div>

        <div
          id="addApplicationPopover"
          popover="auto"
          className="fixed  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-50 bg-white dark:bg-slate-900 opacity-100 starting:open:opacity-0 transition-all ease-in-out duration-500 "
        >
          <AddApplicationForm />
        </div>
      </div>
    </div>
  );
}

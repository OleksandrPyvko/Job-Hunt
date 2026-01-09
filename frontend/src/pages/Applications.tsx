import Filter from "../components/Filter/Filter";
import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "../api/http";
import { useAuth } from "../contexts/AuthContext";
import ApplicationsList from "../components/Applications/ApplicationsList";

function Applications() {
  const { tokenData } = useAuth();

  const { data, isPending, isError } = useQuery({
    queryKey: ["userApplications"],
    queryFn: () => getUserApplications(tokenData?.userId || ""),
  });

  if (isPending) return <p>Loading...</p>;
  if (data?.length === 0)
    return (
      <div className="">
        <p>Watahel</p>
        <button
          className="outline outline-gray-400 px-3 py-2 cursor-pointer"
          popoverTarget="addApplicationPopover"
        >
          + Add new application
        </button>

        <div
          id="addApplicationPopover"
          popover="auto"
          className="mx-auto my-auto opacity-0 translate-y-4 scale-95
                     transition-all duration-300 ease-out
                     transition-discrete
                     [&:popover-open]:opacity-100
                     [&:popover-open]:translate-y-0
                     [&:popover-open]:scale-100"
        >
          Woo, it's a popover window
          <button
            popoverTargetAction="hide"
            popoverTarget="addApplicationPopover"
          >
            Close
          </button>
        </div>
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

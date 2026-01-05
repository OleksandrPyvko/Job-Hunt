import { useQuery } from "@tanstack/react-query";
import CalendarIcon from "../Icons/CalendarIcon";
import type { ApplicationType } from "../../types/types";
import ListIcon from "../Icons/ListIcon";
import SuitCase from "../Icons/SuitCase";
import { getUserApplications } from "../../api/http";
import { useAuth } from "../../contexts/AuthContext";

function Results() {
  const { tokenData } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUserApplications(tokenData?.userId || ""),
    queryKey: ["userApplications"],
  });

  const interviewsCount =
    data?.filter(
      (application: ApplicationType) => application.status === "interview"
    ).length || 0;

  const offersCount =
    data?.filter(
      (application: ApplicationType) => application.status === "offer"
    ).length || 0;
  console.log("Results data:", data);

  return (
    <div className="flex flex-col  md:py-16 gap-16 max-w-[900px]  mx-auto ">
      <div className="md:flex justify-between">
        <div>
          <p>Results</p>
          <h3 className="text-3xl font-semibold my-4 max-w-64">
            How your search is moving
          </h3>
          <p className="max-w-lg   ">
            The numbers matter. They show what's working and what needs
            adjustment. Watch them grow as you move forward.
          </p>
        </div>
        <div className="md:flex md:items-center"></div>
      </div>

      <div className=" gap-6 grid  grid-cols-2  md:grid-cols-3  md:grid-rows-2 ">
        <div className=" flex gap-6 md:flex-row flex-col md:flex md:row-span-2 md:col-span-1 w-full ">
          <div className="  dark:bg-(--darkgray) rounded-lg border border-neutral-700 p-7 w-full">
            <p className="text-5xl font-bold mb-6">{data?.length}</p>
            <p className="font-medium">Applications sent out</p>
            <p className="hidden md:block">
              You've made your move. Now wait and see.
            </p>
          </div>
        </div>
        <div className="rounded-lg p-7 flex justify-center  w-full items-center ">
          <CalendarIcon w={100} h={100} />
        </div>

        <div className=" flex gap-6 md:flex-row flex-col md:flex ">
          <div className="dark:bg-(--darkgray) rounded-lg p-7 w-full border border-neutral-700">
            {interviewsCount > 0 ? (
              <>
                <p className="text-5xl font-bold mb-6">{interviewsCount}</p>
                <p className="font-medium ">
                  {interviewsCount > 1 && `${"Interviews lined up"}`}
                  {interviewsCount === 1 && `${"Interview lined up"}`}
                </p>
                <p className="hidden md:block">
                  They want to meet you. Be ready.
                </p>
              </>
            ) : (
              <div className=" flex items-center justify-center h-full">
                <p className="text-center my-auto ">
                  No interviews scheduled yet.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className=" flex gap-6 md:flex-row flex-col md:flex border rounded-lg border-neutral-700">
          <div className="dark:bg-(--darkgray) rounded-lg p-7 h-full w-full">
            {offersCount > 0 ? (
              <div>
                <p className="text-5xl font-bold mb-6">{offersCount}</p>
                <p className="font-medium">Offers in hand</p>
                <p>The work is paying off. Consider your options.</p>
              </div>
            ) : (
              <div className=" flex items-center justify-center h-full w-full">
                <p className="text-center my-auto ">
                  You haven't received any offers yet.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className=" rounded-lg p-7 md:flex justify-center items-center hidden md:block">
          <SuitCase w={100} h={100} />
        </div>
      </div>
    </div>
  );
}

export default Results;

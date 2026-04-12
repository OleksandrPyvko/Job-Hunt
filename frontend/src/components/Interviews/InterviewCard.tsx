import { useState } from "react";
import type { ApplicationType } from "../../types/types";

function InterviewCard({ application }: { application: ApplicationType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl  w-full max-w-[700px] bg-neutral-100  dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 p-6 shadow-sm   ">
      <div className="font-bold text-2xl py-2 text-sky-600">
        {application.company}
      </div>
      <div className="  dark:text-neutral-300 font-bold mb-1 ">
        {application.position}
      </div>
      <div className="mb-1 font-bold">
        Interview on: {application.interview}
      </div>
      <div className="line-clamp-1 text-neutral-400">{application.notes}</div>

      <button
        onClick={() => setIsOpen(true)}
        popoverTarget="interview-popover"
        className="text-sky-900 mt-4 underline hover:text-cyan-600"
      >
        View Details
      </button>

      {isOpen && (
        <div
          id="interview-popover-bg"
          onClick={() => setIsOpen(false)}
          className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 backdrop-blur-md z-40"
        >
          <div
            id="interview-popover"
            popover="auto"
            className="min-w-sm max-w-[500px] p-8 rounded-2xl bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg py-2">{application.company}</h3>
              <p className="font-bold">{application.interview}</p>
            </div>
            <p className="pb-1  dark:text-neutral-300 font-bold">
              {application.position}
            </p>
            <p className=" text-neutral-800 dark:text-neutral-400 pb-2">
              {application.notes}
            </p>
            <button
              popoverTarget="interview-popover"
              className="text-red-500 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewCard;

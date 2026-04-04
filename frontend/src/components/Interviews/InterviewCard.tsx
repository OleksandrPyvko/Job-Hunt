import { useState } from "react";
import type { ApplicationType } from "../../types/types";

function InterviewCard({ application }: { application: ApplicationType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 p-6 shadow-sm">
      <div className="font-bold text-xl">{application.company}</div>
      <div>{application.position}</div>
      <div>{application.interview}</div>
      <div className="line-clamp-2">{application.notes}</div>

      <button
        onClick={() => setIsOpen(true)}
        popoverTarget="interview-popover"
        className="text-blue-500 hover:text-blue-700"
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
            className="p-8 rounded-2xl bg-neutral-900 dark:text-neutral-200 absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
          >
            <h3 className="font-bold text-lg">{application.company}</h3>
            <p>{application.position}</p>
            <p>{application.interview}</p>
            <p className="line-clamp-2">{application.notes}</p>
            <button
              popoverTarget="interview-popover"
              className="text-blue-500 hover:text-blue-700"
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

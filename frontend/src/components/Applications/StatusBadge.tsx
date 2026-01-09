import React from "react";

type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const key = (status || "").toLowerCase();

  const mapping: Record<string, string> = {
    interview: "bg-yellow-100 text-yellow-800",
    offer: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800",
  };

  const classes = mapping[key] || mapping["default"];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${classes}`}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}

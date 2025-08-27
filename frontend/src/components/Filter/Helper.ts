import type { ApplicationType } from "../../types/types";

export function SortData(
  data: ApplicationType[],
  sort: string = "all",
  status: string = "all"
) {
  if (data.length === 0) return [];

  const filteredData =
    status === "all"
      ? data
      : data.filter(
          (application: ApplicationType) => application.status === status
        );

  switch (sort) {
    case "date-desc":
      return filteredData
        .slice()
        .sort(
          (a, b) =>
            new Date(b.applied).getTime() - new Date(a.applied).getTime()
        );
    case "date-asc":
      return filteredData
        .slice()
        .sort(
          (a, b) =>
            new Date(a.applied).getTime() - new Date(b.applied).getTime()
        );
    case "company-asc":
      return filteredData
        .slice()
        .sort((a, b) => a.company.localeCompare(b.company));
    case "company-desc":
      return filteredData
        .slice()
        .sort((a, b) => b.company.localeCompare(a.company));
    case "all":
    default:
      return filteredData;
  }
}

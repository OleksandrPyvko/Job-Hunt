import { useRef, type FormEvent } from "react";
import type { ApplicationType } from "../../types/types";
import { useAuth } from "../../context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplicationById, updateApplication } from "../../api/http";

type Props = {
  applicationId: string;
};

function UpdateApplicationForm({ applicationId }: Props) {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { tokenData } = useAuth();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const { data, isPending, error } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => getApplicationById(applicationId),
  });

  const { mutate } = useMutation({
    mutationFn: ({
      id,
      updatedApplication,
    }: {
      id: string;
      updatedApplication: ApplicationType & { userId: string };
    }) => updateApplication(id, updatedApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userApplications"],
      });
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  //   function handleSubmit(e: FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     const fd = new FormData(e.currentTarget);

  //     const application: ApplicationType & { userId: string } = {
  //       company: fd.get("company") as string,
  //       status: fd.get("status") as ApplicationType["status"],
  //       position: fd.get("position") as string,
  //       location: fd.get("location") as string,
  //       applied: fd.get("applied") as string,
  //       notes: fd.get("notes") as string,
  //       userId: tokenData!.userId as string,
  //     };
  //   }

  return (
    <form ref={formRef}>
      <label>Company</label>
      <input name="company" type="text" defaultValue={data.company} />
      <label>Status</label>
      <select name="status" id="" defaultValue={data.status}>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <label>Position</label>
      <input name="position" type="text" defaultValue={data.position} />
      <label>Location</label>
      <input name="location" type="text" defaultValue={data.location} />
      <label>Applied on</label>
      <input name="applied" defaultValue={formattedDate} type="date" />
      <label>Notes</label>
      <textarea name="notes" defaultValue={data.notes} />
      <button type="submit">ADD</button>
    </form>
  );
}

export default UpdateApplicationForm;

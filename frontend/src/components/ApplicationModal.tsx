import { useEffect, useState } from "react";
import { getApplicationById } from "../api/http";
// import type { ApplicationType } from "../types/types";

export type ApplicationType = {
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string;
  notes?: string;
};

type ModalProps = {
  id: string;
};

function ApplicationModal({ id }: ModalProps) {
  const [data, setData] = useState<ApplicationType | null>(null);

  useEffect(() => {
    async function getApplication() {
      const application = await getApplicationById(id);
      setData(application);
    }

    getApplication();
  }, [data, setData, id]);

  return (
    <div>
      <p>{data?.company}</p>
      <p>{data?.applied}</p>
      <p>{data?.location}</p>
      <p>{data?.position}</p>
      <p>{data?.notes}</p>
    </div>
  );
}

export default ApplicationModal;

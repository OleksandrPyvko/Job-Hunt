import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ApplicationData {
  _id: string;
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string | null;
  notes?: string;
}

function Application() {
  const params = useParams();
  const [applicationData, setApplicationData] =
    useState<ApplicationData | null>(null);

  useEffect(() => {
    async function getApplication(id?: string) {
      if (!id) return;
      try {
        const response = await fetch(
          `http://localhost:3000/applications/${id}`
        );
        const data: ApplicationData = await response.json();
        setApplicationData(data);
      } catch (e) {
        alert("Handle APPLICATION NOT FOUND error");
      }
    }

    getApplication(params.id);
  }, [params.id]);

  return <div>{applicationData?.company}</div>;
}

export default Application;

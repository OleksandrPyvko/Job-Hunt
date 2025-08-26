import { useEffect, useRef, useState } from "react";
import ApplicationsRow from "./ApplicationsRow";
import classes from "./ApplicationsTable.module.css";
import { deleteApplication, getUserApplications } from "../../api/http";
import { useAuth } from "../../context";

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

function ApplicationsTable() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [applicationsStatus] = useState({
    isDeleting: false,
    isLoading: false,
    isAdding: false,
    isEditing: false,
  });

  const { tokenData } = useAuth();

  useEffect(() => {
    async function fetchData() {
      applicationsStatus.isLoading = true;
      try {
        const data = await getUserApplications(tokenData?.userId || "");
        setApplications(data);
      } catch (e) {
        setApplications([]);
        console.error(e);
      } finally {
        applicationsStatus.isLoading = false;
      }
    }

    fetchData();
  }, [tokenData, applicationsStatus]);

  async function handleDeletion(id: string) {
    applicationsStatus.isDeleting = true;
    try {
      await deleteApplication(id);
      setApplications((prevData) => prevData.filter((item) => item._id !== id));
    } catch (e) {
      alert(e);
    } finally {
      applicationsStatus.isDeleting = false;
    }
  }

  if (applicationsStatus.isLoading) return <p>Loading...</p>;
  if (applications?.length === 0) return <p>No data has been found</p>;

  return (
    <>
      <table>
        <thead>
          <tr className={classes.tr}>
            <th>Company</th>
            <th>Status</th>
            <th>Position</th>
            <th>Location</th>
            <th>Applied</th>
            <th>Interview</th>
            <th className={classes.notes}>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((a, index) => (
            <ApplicationsRow
              index={index}
              key={a._id}
              application={a}
              onEdit={console.log("edit")}
              onDelete={() => handleDeletion(a._id)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ApplicationsTable;

import { useEffect, useRef, useState } from "react";
import classes from "./Applications.module.css";
import { jwtDecode } from "jwt-decode";
import { deleteApplication, getUserApplications } from "../api/http";
import { useAuth } from "../context";
import ApplicationModal from "../components/ApplicationModal";

type ApplicationType = {
  _id: string;
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string | null;
  notes?: string;
};

function Applications() {
  const [data, setData] = useState<ApplicationType[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //**********************Add filter status based on status *********************** */
  const dialog = useRef<HTMLDialogElement | null>(null);
  const { tokenData } = useAuth();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const data = await getUserApplications(tokenData?.userId || "");
        setData(data);
      } catch (e) {
        setData([]);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  async function handleDeletion(id: string) {
    setIsDeleting(true);
    try {
      await deleteApplication(id);
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (e) {
      alert(e);
    } finally {
      setIsDeleting(false);
    }
  }

  function openModal() {
    dialog.current?.showModal();
  }
  if (isLoading) return <p>Loading...</p>;

  if (data?.length === 0) return <p>No data has been found</p>;

  return (
    <>
      {data.map((i) => (
        <ApplicationModal id={i._id} />
      ))}
      <h2>Applications</h2>
      <div>
        <ul className={classes.list}>
          <li className={`${classes["list-item"]} ${classes.bold}`}>
            <span className={classes.item}>Company</span>
            <span className={classes.item}>Status</span>
            <span className={classes.item}>Position</span>
            <span className={classes.item}>Location</span>
            <span className={classes.item}>Applied</span>
            <span className={classes.item}>Interview</span>
            <span className={`${classes.item} ${classes.notes}`}>Notes</span>
          </li>
        </ul>

        <ul className={classes.list}>
          {data.length > 0 &&
            data?.map((item) => (
              <li key={item._id} className={classes["list-item"]}>
                <span className={classes.item}>{item.company}</span>
                <span className={classes.item}>{item.status}</span>
                <span className={classes.item}>{item.position}</span>
                <span className={classes.item}>{item.location}</span>
                <span className={classes.item}>{item.applied}</span>
                <span className={classes.item}>{item?.interview}</span>
                <span className={`${classes.item} ${classes.notes}`}>
                  <span>{item?.notes}</span>
                  <span>
                    <button onClick={openModal}>Edit</button>
                    {isDeleting ? (
                      <span>Deleting...</span>
                    ) : (
                      <button onClick={() => handleDeletion(item._id)}>
                        Delete
                      </button>
                    )}
                  </span>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Applications;

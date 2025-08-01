import { useEffect, useRef, useState } from "react";
import classes from "./Applications.module.css";
import { jwtDecode } from "jwt-decode";
import { deleteApplication } from "../api/http";

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

type MyJWTPayload = {
  // username?: string;
  // id?: string;
  userId?: string;
};

function Applications() {
  const [data, setData] = useState<ApplicationType[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //////!!!!!!! ADD DELETING INDICATOR ON DELETION AND CHANGING STATE WILL RERENDER LIST OF APPLICATIONS
  const dialog = useRef<HTMLDialogElement | null>(null);
  const token = localStorage.getItem("token");
  const tokenData = token ? jwtDecode<MyJWTPayload>(token) : {};

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/applications/user/${tokenData.userId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from server");
        }
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

  if (data?.length === 0)
    return <p>No data has been found {tokenData.userId}</p>;

  return (
    <>
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

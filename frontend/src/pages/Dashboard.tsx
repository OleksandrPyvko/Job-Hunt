import { Link } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Dashboard.module.css";
import { useRef } from "react";
import Modal from "../components/Modal";
import ApplicationForm from "../components/Applications/ApplicationForm";
import { useAuth } from "../context";
import { getUserApplications } from "../api/http";
import Overview from "../components/Overview";
import { useQuery } from "@tanstack/react-query";
import UpcomingInterviews from "../components/Dashboard/UpcomingInterviews";
import RecentApplications from "../components/Dashboard/RecentApplications";

function Dashboard() {
  const { tokenData } = useAuth();
  const dialog = useRef<HTMLDialogElement>(null);

  function handleAddApplication() {
    dialog.current?.showModal();
  }

  function handleCloseDialog() {
    dialog.current?.close();
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["userApplications"],
    queryFn: () => getUserApplications(tokenData?.userId || ""),
  });

  return (
    <div className={classes.dashboard}>
      <h2>Welcome, {tokenData?.username}</h2>

      <div className={classes.overview}>
        <UpcomingInterviews data={data} />
        <RecentApplications />

        {/* <div className={classes["overview-item"]}>
          <h3>Recent Applications</h3>
          <p className={classes["overview-row"]}>
            <Link to="">Spotify | UI Eng | 🟡</Link>
          </p>
          <p className={classes["overview-row"]}>
            <Link to="" className={classes["overview-row"]}>
              Google | FE Dev | 🔵
            </Link>
          </p>
        </div> */}
      </div>
      <div className={classes.actions}>
        <Modal ref={dialog} onClose={handleCloseDialog}>
          <ApplicationForm ref={dialog} />
        </Modal>
        <Button onClick={handleAddApplication}>+ Add new application</Button>
      </div>
      <Overview data={data ?? []} />
    </div>
  );
}

export default Dashboard;

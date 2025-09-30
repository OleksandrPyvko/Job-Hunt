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
      <h2 className={classes.header}>Welcome, {tokenData?.username}</h2>

      <div className={classes.overview}>
      {/* <Overview data={data ?? []} /> */}
        <RecentApplications />
        <UpcomingInterviews data={data} />
      </div>
      <div className={classes.actions}>
        <Modal ref={dialog} onClose={handleCloseDialog}>
          <ApplicationForm ref={dialog} />
        </Modal>
        <Button onClick={handleAddApplication}>+ Add new application</Button>
      </div>
    </div>
  );
}

export default Dashboard;

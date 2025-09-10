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

type ApplicationType = {
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string;
  notes?: string;
};

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
    <>
      <div className={classes.heading}>
        <h2 className={classes.greeting}>Welcome, {tokenData?.username}</h2>
      </div>

      <div className={classes.dashboard}>
        <Overview data={data ?? []} />

        <div className={classes.overview}>
          <div className={classes["overview-item"]}>
            <h3>Upcoming interviews</h3>
            <p className={classes["overview-row"]}>Google - 30 Jun | 14:00</p>
            <p className={classes["overview-row"]}>Amazon – 2 Jul | 11:40</p>
            <p className={classes["overview-row"]}>
              Puzata Hata – 2 Jul | 15:00
            </p>
          </div>

          <div className={classes["overview-item"]}>
            <h3>Recent Applications</h3>
            <p className={classes["overview-row"]}>
              <Link to="">Spotify | UI Eng | 🟡</Link>
            </p>
            <p className={classes["overview-row"]}>
              <Link to="" className={classes["overview-row"]}>
                Google | FE Dev | 🔵
              </Link>
            </p>
          </div>
        </div>
        <div className={classes.actions}>
          <Modal ref={dialog} onClose={handleCloseDialog}>
            <ApplicationForm ref={dialog} />
          </Modal>
          <Button onClick={handleAddApplication}>+ Add new application</Button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

import { Link } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./Dashboard.module.css";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import ApplicationForm from "../components/ApplicationForm";
import addApplication from "../api/http";

type ApplicationType = {
  company: string;
  status: string;
  position: string;
  location: string;
  applied: string;
  interview?: string;
  notes?: string;
};

const TestApplication: ApplicationType = {
  company: "Yoy",
  status: "applied",
  position: "FE",
  location: "remote",
  applied: "10-7=2025",
};

function Dashboard() {
  const dialog = useRef<HTMLDialogElement>(null);

  function handleAddApplication() {
    dialog.current?.showModal();
  }

  function handleCloseDialog() {
    dialog.current?.close();
  }

  return (
    <>
      <div className={classes.heading}>
        <h2>Welcome, Oleksandr</h2>
        <p>You have 3 interviews...</p>
      </div>
      <div className={classes.stats}>
        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! make it as a graph component  */}
        <div>
          <p>📋 12 Applications</p>
          <p>🟢 1 Offer</p>
          <p>❌ 4 Rejections</p>
          <p>🗓️ 3 Interviews</p>
        </div>
        <div className={classes["stat-container"]}>
          <div className={classes["stat-row1"]}>8%</div>
          <div className={classes["stat-row2"]}>33%</div>
          <div className={classes["stat-row3"]}>25%</div>
        </div>
      </div>

      <div className={classes.overview}>
        <div className={classes["overview-item"]}>
          <h3>Upcoming interviews</h3>
          <p className={classes["overview-row"]}>Google - 30 Jun | 14:00</p>
          <p className={classes["overview-row"]}>Amazon – 2 Jul | 11:40</p>
          <p className={classes["overview-row"]}>Puzata Hata – 2 Jul | 15:00</p>
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
          <ApplicationForm ref={dialog}/>
        </Modal>
        <Button onClick={handleAddApplication}>+ Add new application</Button>
      </div>
    </>
  );
}

export default Dashboard;

import Button from "../UI/Button";
import { useRef } from "react";

import Modal from "../components/Modal";
import ApplicationForm from "../components/Applications/ApplicationForm";
import { useAuth } from "../contexts/AuthContext";
import { getUserApplications } from "../api/http";
import { useQuery } from "@tanstack/react-query";
import UpcomingInterviews from "../components/Dashboard/UpcomingInterviews";
import RecentApplications from "../components/Dashboard/RecentApplications";
import DashboardLinks from "../components/Dashboard/DashboardLinks";
import CalendarIcon from "../components/Icons/CalendarIcon";
import Results from "../components/Dashboard/Results";
import Recent from "../components/Dashboard/Recent";

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
    <div id="dashboard" className="lg:flex py-14 gap-10">
      <Results />
      <Recent />

      {/* <div className="py-14 md:py-28">
        <h2 className="text-5xl text-center mb-6">Your job dashboard</h2>
        <p className="text-center">
          Track and manage your job search in one place. See what matters most.
        </p>
      </div> */}

      {/* 
      <h2 className="">Welcome, {tokenData?.username}</h2>

      <div className="">
        <RecentApplications />
        <UpcomingInterviews data={data} />
      </div>
      <div className="">
        <Modal ref={dialog} onClose={handleCloseDialog}>
          <ApplicationForm ref={dialog} />
        </Modal>
        <Button onClick={handleAddApplication}>+ Add new application</Button>
      </div> */}
    </div>
  );
}

export default Dashboard;

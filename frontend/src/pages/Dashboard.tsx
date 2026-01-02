import Results from "../components/Dashboard/Results";
import Recent from "../components/Dashboard/Recent";

function Dashboard() {
  return (
    <div id="dashboard" className="lg:flex py-14 gap-10">
      <Results />
      <Recent />
    </div>
  );
}

export default Dashboard;

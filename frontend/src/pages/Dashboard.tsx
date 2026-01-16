import Results from "../components/Dashboard/Results";
import Recent from "../components/Dashboard/Recent";

function Dashboard() {
  return (
    <div id="dashboard" className="lg:flex min-h-[calc(100vh-72px)] gap-10">
      <Results />
      <Recent />
    </div>
  );
}

export default Dashboard;

import classes from "./Applications.module.css";
import ApplicationsTable from "../components/Applications/ApplicationsTable";
import Filter from "../components/Filter/Filter";

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
  return (
    <div className={classes.container}>
      <Filter />
      <ApplicationsTable />
    </div>
  );
}

export default Applications;

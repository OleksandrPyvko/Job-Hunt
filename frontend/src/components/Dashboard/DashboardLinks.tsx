import { NavLink } from "react-router-dom";
import CalendarIcon from "../Icons/CalendarIcon";
import ListIcon from "../Icons/ListIcon";

function DashboardLinks() {
  return (
    <div className="py-28">
      <div className="text-center">
        <p>Focus</p>
        <h3 className="text-3xl py-2">What you need now</h3>
        <p>Everything is here. Nothing is hidden</p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <ListIcon />
          <p>Applications</p>
        </div>
        <p>View all your jab applications</p>
        <p>See where you stand with each one.</p>
        <NavLink className="font-semibold text-sky-400" to="/interviews">
          {" "}
          View &gt;{" "}
        </NavLink>
      </div>
      <div className="flex items-center gap-2">
        <CalendarIcon />
        <p>Interviews</p>
      </div>
    </div>
  );
}

export default DashboardLinks;

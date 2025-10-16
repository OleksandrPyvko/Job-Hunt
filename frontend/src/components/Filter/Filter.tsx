import { useSearchParams } from "react-router-dom";
import classes from "./Filter.module.css";
import Modal from "../Modal";
import ApplicationForm from "../Applications/ApplicationForm";
import { useRef } from "react";

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dialog = useRef<HTMLDialogElement>(null);

  const sort = searchParams.get("sort") || "all";
  const status = searchParams.get("status") || "all";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("status", e.target.value);
    setSearchParams(searchParams);
  };

  function handleAddApplication() {
    dialog.current?.showModal();
  }

  function handleCloseDialog() {
    dialog.current?.close();
  }

  return (
    <div className={classes['filter-container']}>
      <div className={classes.filter}>
        <div className={classes["selector-holder"]}>
          <label htmlFor="sort">Sort</label>
          <select
            name="sort"
            id="sort"
            className={classes.selector}
            value={sort}
            onChange={handleSortChange}
          >
            <option value="all">All</option>
            <option value="date-desc">Date applied 🔻</option>
            <option value="date-asc">Date applied 🔺</option>
            <option value="company-desc">Company A-Z</option>
            <option value="company-asc">Company Z-A</option>
          </select>
        </div>

        <div className={classes["selector-holder"]}>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            className={classes.selector}
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button onClick={handleAddApplication} className={classes['add-button']}>
          Add Application
        </button>

        <Modal ref={dialog} onClose={handleCloseDialog}>
          <ApplicationForm ref={dialog} />
        </Modal>
      </div>
    </div>
  );
}

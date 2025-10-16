import { Suspense } from "react";
import { GradientBackground } from "../UI/GradientBackground";
import classes from "./Analytics.module.css";

function Analytics() {
  return (
    <div>
      <div className={classes.background}>
        <Suspense fallback={<div>Loading background...</div>}>
          <GradientBackground />
        </Suspense>
      </div>
      <p>Hello world</p>
    </div>
  );
}

export default Analytics;

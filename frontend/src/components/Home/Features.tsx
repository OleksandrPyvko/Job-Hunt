import { NavLink } from "react-router-dom";
import cardImg1 from "../../assets/images/card.png";
import cardImg2 from "../../assets/images/card2.png";
import cardImg3 from "../../assets/images/card3.png";

function Features() {
  return (
    <div className=" ">
      <div className="text-center flex flex-col gap-3 my-12">
        <p className="font-semibold">Features</p>
        <p className="text-5xl font-semibold mb-4">What we offer</p>
        <p>Everything you need to manage your job search effectively.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 ">
        <div className=" w-full bg-(--greyish) rounded-3xl flex flex-col items-center flex-1 ">
          <img src={cardImg2} alt="" className="size- rounded-3xl " />
          <div className="px-8 py-10 w-full ">
            <p className="font-medium">Track</p>
            <p className="font-semibold text-3xl my-3">
              Application tracking system{" "}
            </p>
            <p className="mb-6">
              Monitor every application from application to decision{" "}
            </p>
            <NavLink className="font-semibold " to="/applications">
              Explore &gt;
            </NavLink>
          </div>
        </div>
        <div className=" w-full bg-(--greyish) rounded-3xl flex flex-col items-center flex-1">
          <img src={cardImg3} alt="" className="size- rounded-3xl " />
          <div className="px-8 py-10 w-full ">
            <p className="font-medium">Interview</p>
            <p className="font-semibold text-3xl my-3">
              Schedule and prepare for interviews
            </p>
            <p className="mb-6">
              Stay ready with interview scheduling and prep tools.{" "}
            </p>
            <NavLink className="font-semibold " to="/interviews">
              Explore &gt;
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;

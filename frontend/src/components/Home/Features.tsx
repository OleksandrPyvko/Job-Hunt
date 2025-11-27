import { NavLink } from "react-router-dom";
import cardImg1 from "../../assets/images/card.png";
import cardImg2 from "../../assets/images/card2.png";
import cardImg3 from "../../assets/images/card3.png";

function Features() {
  return (
    <div className=" ">
      <div className="text-center flex flex-col gap-3 my-12">
        <p>Features</p>
        <p className="text-4xl">What we offer</p>
        <p>Everything you need to manage your job search effectively.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className=" w-full bg-(--greyish) rounded-3xl ">
          <img src={cardImg2} alt="" className="size- rounded-3xl" />
          <div className="px-8 py-10">
            <p className="font-medium">Track</p>
            <p className="font-semibold text-3xl my-3">
              Application tracking system{" "}
            </p>
            <p className="">Monitor every application from application to decision </p>
            <NavLink to='/applications' >Explore &gt;</NavLink>
          </div>
        </div>
        <div className="h-full w-auto ">
          <img src={cardImg3} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Features;

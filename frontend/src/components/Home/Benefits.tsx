import { NavLink } from "react-router-dom";
import benefits_img from "../../assets/images/benefits.png";
import getStartedImg from "../../assets/images/getReady.png";

function Benefits() {
  return (
    <div className="bg-(--darkbg) text-slate-200 rounded-3xl lg:px-6 ">
      <div className=" bg-(--darkbg) text-slate-200 text-center py-14 px-4 rounded-3xl">
        <div className="pb-14">
          <p className=" font-semibold">Benefits</p>
          <h3 className="text-4xl font-bold my-2 ">Why choose us</h3>
          <p>Designed to help you succeed in your job search journey.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:max-h-[650px]">
          <div className="flex rounded-3xl md:flex-row bg-(--darkgray) flex-col lg:flex-row overflow-hidden lg:flex-2">
            <div className="h-full  lg:max-h-[650px] ">
              <img
                src={benefits_img}
                alt=""
                className="h-full md:max-h-[650px] max-h-[400px] object-top"
              />
            </div>
            <div className="text-left px-8 py-10 flex  flex-col justify-center ">
              <p className="font-medium">Efficiency</p>
              <p className="font-semibold text-3xl my-3">
                Organize all your applications
              </p>
              <p className="mb-6">
                Keep everything in one place and never lose track.
              </p>
              <NavLink
                className="font-semibold text-sky-400"
                to="/applications"
              >
                Explore &gt;
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row lg:flex-col lg:flex-1">
            <div className="bg-(--darkgray) rounded-3xl flex flex-col text-left px-8 py-10">
              <p>image</p>
              <p className="font-semibold text-3xl my-3">Stay informed</p>
              <p className="mb-6">
                Know exactly where you stand with each opportunity.
              </p>
              <NavLink
                className="font-semibold text-sky-400"
                to="/applications"
              >
                {" "}
                Explore &gt;{" "}
              </NavLink>
            </div>

            <div className="bg-(--darkgray) rounded-3xl flex flex-col text-left px-8 py-10">
              <p>image</p>
              <p className="font-semibold text-3xl my-3">Prepare better</p>
              <p className="mb-6">
                Get ready for interviews with confidence and clarity.
              </p>
              <NavLink className="font-semibold text-sky-400" to="/interviews">
                {" "}
                Explore &gt;{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4  pb-10 ">
        <div
          className=" w-full bg-cover bg-center h-64 rounded-xl"
          style={{ backgroundImage: `url(${getStartedImg})` }}
        >
          <div className="rounded-2xl text-slate-200 px-6 py-8 text-center flex flex-col justify-center  items-center h-full">
            <h2 className="mb-3 text-2xl font-semibold md:text-4xl">
              Ready to get started
            </h2>
            <p className="mb-6 text-sm text-gray-100/80 md:text-lg">
              Join now and take control of your job search with our platform.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button className="rounded-md bg-[#0064FF] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#0050cc]">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;

import heroImg from "../../assets/images/hero.png";

function Hero() {
  return (
    <div className=" bg-(--greyish) dark:bg-(--darkgray) dark:text-gray-300 outline outline-black/20 rounded-lg flex flex-col lg:flex-row lg:py-24 lg:mt-18">
      <div className="  px-8 py-8 lg:flex-1 lg:pl-24 lg:flex lg:flex-col justify-center flex flex-col items-center lg:items-start">
        <p className="mb-6 font-inter font-semibold text-4xl lg:text-7xl/20 text-slate-800 md:mt-8 md:text-center md:max-w-[600px] md:text-6xl dark:text-gray-300 lg:text-left">
          Find your next opportunity here
        </p>

        <p className="mb-6 md:max-w-[800px] md:text-center md:text-xl lg:text-left lg:max-w-900px">
          Track every application. Stay organized. Land the job. Your search
          starts now with tools built for the serious candidate.
        </p>

        <button className="bg-blue-500 hover:bg-blue-600 shadow-md hover:drop-shadow-slate-900 hover:drop-shadow-xl/30   rounded-lg w-[90%] md:w-40 h-12 text-amber-50 cursor-pointer">
          Start now
        </button>
      </div>
      <div className="py-6 flex  justify-center items-center  md:flex-1">
        <img src={heroImg} alt="person" className="" />
      </div>
    </div>
  );
}

export default Hero;

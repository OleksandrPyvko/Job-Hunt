import heroImg from "../../assets/images/hero.png";

function Hero() {
  return (
    <div className=" bg-(--greyish) outline outline-black/20 rounded-lg flex flex-col md:flex-row md:py-24 md:mt-18">
      <div className="px-8 py-8 md:flex-1 md:pl-24 md:flex md:flex-col justify-center flex flex-col items-center md:items-start">
        <p className="mb-6 font-inter font-semibold text-4xl md:text-8xl/20 text-slate-800">
          Find your next opportunity here
        </p>

        <p className="mb-6">
          Track every application. Stay organized. Land the job. Your search
          starts now with tools built for the serious candidate.
        </p>

        <button className="bg-blue-500 hover:bg-sky-400 shadow-md hover:drop-shadow-slate-900 hover:drop-shadow-xl/30   rounded-lg w-[90%] md:w-40 h-12 text-amber-50 cursor-pointer">
          Start now
        </button>
      </div>
      <div className="py-6 flex justify-center items-center  md:flex-1">
        <img src={heroImg} alt="person" className="" />
      </div>
    </div>
  );
}

export default Hero;

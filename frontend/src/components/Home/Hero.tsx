import heroImg from "../../assets/images/hero.png";

function Hero() {
  return (
    <div className=" bg-(--greyish) outline outline-black/20 rounded-lg  flex flex-col ">
      <div className="px-8 py-8">
        <p className="mb-6 font-inter font-semibold text-5xl">
          Find your next opportunity here
        </p>
        <p className="mb-6">
          Track every application. Stay organized. Land the job. Your search
          starts now with tools built for the serious candidate.
        </p>

        <button className="bg-blue-500 shadow-md hover:drop-shadow-blue-500 hover:drop-shadow-xl/30 my-auto rounded-lg w-[90%] md:w-20 h-12 text-amber-50 cursor-pointer">
          Start now
        </button>
      </div>
      <div className="py-6 flex justify-center items-center">
        <img src={heroImg} alt="person" className="" />
      </div>
    </div>
  );
}

export default Hero;

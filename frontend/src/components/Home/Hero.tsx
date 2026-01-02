import heroImg from "../../assets/images/hero.png";

function Hero() {
  return (
    <div className="my-16 md:my-0 md:mb-24 md:grid grid-cols-2 grid-rows-2 md:h-[calc(100dvh-80px)]">
      <div>
        <p className=" font-black   tracking-tight text-5xl text-center md:text-[100px]/20 lg:text-[120px]/25 text-slate-800 md:mt-8   dark:text-gray-300 md:text-left">
          Find your next opportunity here
        </p>
      </div>
      <div className="flex text-center items-start justify-center md:justify-end md:text-right">
        <p className="md:text-xl lg:text-2xl mt-12 mb-auto md:max-w-[350px] lg:max-w-[420px]">
          Track every application. Stay organized. Land the job. Your search
          starts now with tools built for the serious candidate.
        </p>
      </div>
      <div className="flex  ">
        <button className="bg-blue-500 hover:bg-blue-600 shadow-md  hover:drop-shadow-slate-900 hover:drop-shadow-xl/30 rounded-lg w-[90%] md:w-40 h-12 text-amber-50 cursor-pointer my-10 mx-auto md:mx-0 md:mt-18   ">
          Start now
        </button>
      </div>
      <div>
        <img src={heroImg} alt="person" className="h-full rounded-lg" />
      </div>
    </div>
  );
}
export default Hero;

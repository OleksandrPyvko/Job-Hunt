import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container flex flex-col  gap-10  text-left border-t border-gray-600 pt-6 ">
      <div className="flex flex-col md:flex-row md:gap-28 gap-6 ">
        <p className="text-shadow-lg hover:text-shadow-sky-500 text-3xl font-black hover:text-white transition-all italic duration-300 ease-in-out">
          JobHunt
        </p>

        <div className="flex flex-col gap-2 ">
          <h3 className="text-lg font-bold">Get started</h3>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/applications">Applications</Link>
          <Link to="/interviews">Interviews</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">Support</h3>
          <Link to="/#FAQ">FAQ</Link>
          <Link to="/#support">Contact us</Link>
        </div>
      </div>

      <div>
        <p className="text-center md:text-left text-sm">
          © 2025 Job Hunt Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;

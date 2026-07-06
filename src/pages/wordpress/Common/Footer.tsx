import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="bg-[#112518] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xs sm:text-2xl font-bold">ENERGHX</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Link to="/" className="hover:text-green-300 transition-colors">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-green-300 transition-colors"
            >
              About us
            </Link>
            <Link
              to="/internship"
              className="hover:text-green-300 transition-colors"
            >
              Internships
            </Link>
            <Link
              to="/incentives"
              className="hover:text-green-300 transition-colors"
            >
              Incentives
            </Link>
            <Link
              to="/partners"
              className="hover:text-green-300 transition-colors"
            >
              Partners
            </Link>
            <Link
              to="/energhxplus"
              className="hover:text-green-300 transition-colors"
            >
              EnerghxPlus
            </Link>
            <Link
              to="/contact"
              className="hover:text-green-300 transition-colors"
            >
              Contact us
            </Link>
          </div>
          <div className="text-center text-sm">
            <p>COPYRIGHT © 2022 ENERGHX</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

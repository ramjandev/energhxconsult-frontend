import { Link } from "react-router-dom";
import research from "../../../assets/wordpress/research-banner.png";
import consulting from "../../../assets/wordpress/consult-banner.png";
import WordPressWrapper from "./WordPressWrapper";

const ResearchAndConsulting = () => {
  return (
    <section className="pb-16">
      <WordPressWrapper>
        <div className="w-full grid md:grid-cols-2 gap-8">
          <div className="relative h-[300px] overflow-hidden group rounded-sm">
            <img
              src={research}
              alt="Research"
              className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center bg-black/30">
              <Link
                to="/research"
                className="text-xl sm:text-3xl font-bold font-secondary text-white text-center"
              >
                ENERGHX
                <br />
                RESEARCH
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] overflow-hidden group rounded-sm">
            <img
              src={consulting}
              alt="Consulting"
              className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center bg-black/30">
              <Link
                to="/consulting"
                className="text-xl sm:text-3xl  font-bold font-secondary text-white text-center"
              >
                ENERGHX
                <br />
                CONSULTING
              </Link>
            </div>
          </div>
        </div>
      </WordPressWrapper>
    </section>
  );
};

export default ResearchAndConsulting;

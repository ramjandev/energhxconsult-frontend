import Hero from "./Hero";
import Footer from "../Common/Footer";
import EnergyHome from "../Common/EnergyHome";
import InternshipSection from "../Common/InternshipSection";
import ResearchAndConsulting from "../Common/ResearchAndConsulting";
import NewFlash from "../Common/NewFlash";
const data = {
  title: "ENERGHX HOME",
  des: "  ENERGHX™ releases a new platform for thermal comfort modelling, indoor air quality analysis, and smart energy management of energyconsumption in every built environment. Its EnerghxPlus software isa mobile or web app that promotes energy transition and the adoptionof electric mobility with a net-zero energy management system.",
  link: true,
};
const WhomePage = () => {
  return (
    <>
      <Hero />
      <EnergyHome data={data} />
      <ResearchAndConsulting />
      <InternshipSection />
      <NewFlash />
      <Footer />
    </>
  );
};

export default WhomePage;

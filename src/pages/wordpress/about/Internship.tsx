import CommonWordPressHeader from "../Common/CommonWordPressHeader";

const Internship = () => {
  return (
    <section className="bg-[#112518] text-white  w-full rounded-sm p-16">
      <div className=" flex flex-col gap-6 ">
        <CommonWordPressHeader className="text-white !pb-0">
          ENERGHX INTERNSHIP PROGRAMME
        </CommonWordPressHeader>
        <p className="text-sm  text-white/50 py">
          ENERGHX™ is a consortium of energy experts, researchers, industry
          professionals, and experienced installers/technicians who onboard the
          EnerghxPlus platform as either a server or a developer. Through our
          continuous engagement in developing green energy solutions, ENERGHX™
          is offering internship opportunities to prospective energy ambassadors
          as servers and developers.
        </p>
        <div className="w-full  flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-md text-sm  cursor-pointer">
            Enroll as SERVER
          </button>
          <button className="bg-primary hover:bg-green-600 text-white px-6 py-2 rounded-md text-sm  cursor-pointer">
            Enroll as DEVELOPER
          </button>
        </div>
      </div>
    </section>
  );
};

export default Internship;

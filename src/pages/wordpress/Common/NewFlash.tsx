import flash from "../../../assets/wordpress/bootcamp-min-scaled.jpg";
import WordPressWrapper from "./WordPressWrapper";

const NewFlash = () => {
  return (
    <section className="py-8   sm:py-16 bg-[#f4f4f4] text-black">
      <WordPressWrapper>
        <h2 className="text-xl sm:text-3xl font-bold mb-8">NEWS FLASH</h2>
        <div>
          <div className="relative h-72 mb-4 overflow-hidden  group">
            <img
              src={flash}
              alt="Bootcamp promotion"
              className="w-full h-full object-cover rounded-sm"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"></div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-[#444444]">
            ONLINE BOOTCAMP FOR PROSPECTIVE INTERNS
          </h3>
          <p className="text-[#696969] mb-4">September 21, 2022</p>
          <p className="text-[#696969]">
            Energhx<sup>TM</sup> launches 3-month Intensive Online Bootcamps,
            starting SOON! Energhx Consulting is recruiting Energy Ambassadors
            for Internship roles and the delivery of its energy management
            services. Register online to get direct...
          </p>
        </div>
      </WordPressWrapper>
    </section>
  );
};

export default NewFlash;

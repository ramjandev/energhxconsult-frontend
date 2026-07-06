import image1 from "../../../assets/wordpress/Rectangle6.png";
import image2 from "../../../assets/wordpress/Rectangle1.png";
import image3 from "../../../assets/wordpress/Rectangle2.png";
import image4 from "../../../assets/wordpress/Rectangle3.png";
import image5 from "../../../assets/wordpress/Rectangle4.png";
import image6 from "../../../assets/wordpress/Rectangle5.png";
import CommonWordPressHeader from "../Common/CommonWordPressHeader";
import WordPressWrapper from "../WordPressWrapper";

const imageLists = [
  {
    title: "ENERGY AUDIT & ANALYSIS",
    image: image1,
  },
  {
    title: "BIOMASS PLANT SIZING",
    image: image2,
  },
  {
    title: "SOLAR PV SIZING",
    image: image3,
  },
  {
    title: "WIND TURBINE SIZING",
    image: image4,
  },
  {
    title: "GLOBAL OPTIMIZATION",
    image: image5,
  },
  {
    title: "THERMAL COMFORT & INDOOR AIR QUALITY ANALYSIS",
    image: image6,
  },
];

const Gallery = () => {
  return (
    <WordPressWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16">
        {imageLists.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg group shadow-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <CommonWordPressHeader className="absolute top-1/2 left-1/2 text-white !text-lg text-center transform -translate-x-1/2 -translate-y-1/2 z-10 w-full">
              {item.title}
            </CommonWordPressHeader>
            <div className="absolute inset-0 bg-black  opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </WordPressWrapper>
  );
};

export default Gallery;

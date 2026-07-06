import { Link } from "react-router-dom";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-");

interface Researcher {
  title: string;
  deg: string;
  work: string[];
  web: string;
  profile: string[];
  image: string;
}
interface ResearchCard {
  item: Researcher;
}
const ResearchCard: React.FC<ResearchCard> = ({ item }) => {
  return (
    <>
      <div className="relative flex flex-col h-full w-full max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
        {/* Image */}
        <div className="w-full h-60 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col flex-grow p-4 text-center z-10 bg-white">
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600">{item.deg}</p>
        </div>

        {/* Hover link */}
        <Link
          to={`/research/${slugify(item.title)}`}
          state={{ researcher: item }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        >
          <button className="bg-white text-black px-4 py-2 rounded-md shadow hover:bg-primary hover:text-white transition cursor-pointer">
            Click Here
          </button>
        </Link>
      </div>
    </>
  );
};

export default ResearchCard;

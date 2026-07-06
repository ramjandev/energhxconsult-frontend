import { TiStarFullOutline } from "react-icons/ti";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";

interface starRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating = ({ rating, maxStars = 5 }: starRatingProps) => {
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <TiStarFullOutline
          key={index}
          className="w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      ))}

      {/* Half Star */}
      {halfStar && (
        <FaStarHalfStroke className="w-[18px] h-[18px] text-yellow-400 fill-yellow-400" />
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className="w-[18px] h-[18px] text-gray-300" />
      ))}
    </div>
  );
};

export default StarRating;

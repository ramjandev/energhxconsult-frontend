import { motion } from "framer-motion";
import star from "../../../assets/Profile/lightGreen.svg";
import CommonWordPressHeader from "./CommonWordPressHeader";
import WordPressWrapper from "./WordPressWrapper";

interface DataItem {
  title: string;
  img: string;
}

interface ResidentialProps {
  cardTitle: DataItem[];
  lists: string[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Residential: React.FC<ResidentialProps> = ({ cardTitle, lists }) => {
  return (
    <div className="sm:pb-16 max-sm:pt-6">
      <WordPressWrapper>
        {cardTitle.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className=""
          >
            <div
              className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <motion.div
                className="w-full md:max-w-[280px] h-[280px] relative"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  className="w-full h-full object-cover"
                  src={item.img}
                  alt={item.title.toLowerCase()}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <CommonWordPressHeader className="text-white !text-sm">
                    {item.title}
                  </CommonWordPressHeader>
                </div>
              </motion.div>

              <motion.div
                className="p-10 rounded-md bg-[#f4f4f4] w-full md:max-w-xl mb-6 md:mb-0 "
                variants={fadeInUp}
              >
                {lists.map((listItem, listIndex) => (
                  <motion.div
                    key={listIndex}
                    className="flex items-start gap-2 w-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img src={star} alt="star" />
                    <CommonWordPressHeader className="md:text-sm !pb-2 w-full">
                      {listItem}
                    </CommonWordPressHeader>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </WordPressWrapper>
    </div>
  );
};

export default Residential;

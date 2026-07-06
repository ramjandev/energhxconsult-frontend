import CommonWordPressHeader from "./CommonWordPressHeader";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaAppStore } from "react-icons/fa";
import WordPressWrapper from "../WordPressWrapper";
const DownloadBanner = () => {
  return (
    <>
      <WordPressWrapper>
        <CommonWordPressHeader className="text-black">
          CHOOSE YOUR APPLICATION
        </CommonWordPressHeader>
      </WordPressWrapper>

      <div className="bg-primary ">
        <WordPressWrapper>
          <section className=" text-white text-center py-16">
            <CommonWordPressHeader className=" text-white">
              DOWNLOAD THE ENERGHXPLUS APP FREE NOW
              <br />
              TO KNOW MORE… AND PAY LESS…
            </CommonWordPressHeader>
            <div className="flex flex-col sm:flex-row justify-center gap-6  ">
              <div className="bg-black rounded-full flex items-center justify-center gap-2 px-6 py-3 cursor-pointer shadow-[0_0_5px_5px_rgba(0,0,0,0.1)]">
                <span className="text-xl">
                  <BiLogoPlayStore />
                </span>
                Google Play
              </div>

              <button className="bg-black rounded-full flex items-center justify-center gap-2 f px-6 py-3 cursor-pointer">
                <span className="text-xl">
                  <FaAppStore />
                </span>
                Apple Store
              </button>
            </div>
          </section>
        </WordPressWrapper>
      </div>
    </>
  );
};

export default DownloadBanner;

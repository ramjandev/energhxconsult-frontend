import img from "../../../assets/wordpress/hero-banner.png";
import WordPressWrapper from "../Common/WordPressWrapper";

const Hero = () => {
  return (
    <section
      id="hero"
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${img})` }}
    >
      <WordPressWrapper>
        {/* <Header /> */}
        <div className="flex flex-col justify-end h-[calc(100vh-100px)] py-12">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight font-secondary">
            MONITOR
            <br />
            DESIGN
            <br />
            MANAGE
          </h1>
          <p className="text-xl mt-4">Your energy consumption</p>
          <div className="flex space-x-4 mt-8">
            <button className="border border-primary hover:bg-primary text-primary hover:text-black px-10 py-3 rounded-md transition-colors cursor-pointer">
              Sign up
            </button>
            <button className="border border-primary hover:bg-primary text-primary hover:text-black px-10 py-3 rounded-md transition-colors cursor-pointer">
              Sign in
            </button>
          </div>
        </div>
      </WordPressWrapper>
    </section>
  );
};

export default Hero;

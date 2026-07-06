import WordPressWrapper from "../Common/WordPressWrapper";
import CommonWordPressHeader from "../CommonWordPressHeader";

const ContactForm = () => {
  return (
    <form className=" py-16 ">
      <WordPressWrapper>
        <div className="flex flex-col gap-6 ">
          <div>
            <CommonWordPressHeader>
              THANK YOU FOR REACHING OUT
            </CommonWordPressHeader>
            <p className=" text-gray-400">
              ENERGHX™ is a leading energy management consortium, and a provider
              of Smart Power/Gas with Demand Side Monitoring and Net-Zero Energy
              Management for energy consumers.
            </p>
          </div>

          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="text-primary-gray block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className=" w-full  border border-primary-gray p-2 outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-primary-gray block mb-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className=" w-full  border border-primary-gray p-2 outline-none"
              />
            </div>
            <div className=" sm:col-span-2">
              <label htmlFor="message" className="text-primary-gray block mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={10}
                placeholder="Message"
                className=" w-full  border border-primary-gray p-2 outline-none"
              />
            </div>
          </div>

          <button className=" bg-primary text-white hover:bg-green-500 px-4 py-2 w-fit  rounded-sm cursor-pointer">
            Submit
          </button>
        </div>
      </WordPressWrapper>
    </form>
  );
};

export default ContactForm;

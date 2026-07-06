import Footer from "../Common/Footer";
import MotionImages from "../Common/MotionImages";
import Hero from "../home/Hero";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <div>
      <Hero />
      <MotionImages title="CONTACT US" />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default ContactUs;

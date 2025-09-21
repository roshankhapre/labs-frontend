import HeroSection from "@/components/sections/HeroSection";
import BookingSection from "../sections/BookingSection";
import PackagesSection from "../sections/PackagesSection";
import WhyUsSection from "../sections/WhyUsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import FAQSection from "../sections/FAQSection";
import ContactSection from "../sections/ContactSection";
import AboutUsSection from "../sections/AboutUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BookingSection />
      <PackagesSection />
      <AboutUsSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />

      {/* Other sections will go here */}
    </>
  );
}

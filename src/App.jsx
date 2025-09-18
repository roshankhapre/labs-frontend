import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import BookingSection from "./components/sections/BookingSection";
import ContactSection from "./components/sections/ContactSection";
import FAQSection from "./components/sections/FAQSection";
import Footer from "./components/sections/Footer";
import Navbar from "./components/sections/Navbar";
import PackagesSection from "./components/sections/PackagesSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import WhyUsSection from "./components/sections/WhyUsSection";

// Import your admin pages
import AdminAuth from "./components/pages/AdminAuth";
import AdminDashboard from "./components/pages/AdminDashboard";
import BookingForm from "./components/sections/BookingForm";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <PackagesSection />
                <BookingForm />
                <BookingSection />
                <WhyUsSection />
                <TestimonialsSection />
                <FAQSection />
                <ContactSection />
              </>
            }
          />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

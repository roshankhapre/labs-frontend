import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import BookingSection from "./components/sections/BookingSection";

import Footer from "./components/sections/Footer";
import Navbar from "./components/sections/Navbar";

// Import your admin pages
import AdminAuth from "./components/pages/AdminAuth";
import AdminDashboard from "./components/pages/AdminDashboard";
import TestsPage from "./components/sections/TestsPage";
import AboutUsSection from "./components/sections/AboutUsSection";
import ContactSection from "./components/sections/ContactSection";
import PackagesSection from "./components/sections/PackagesSection";
import NotFound from "./components/sections/NotFound";
import ScrollToTop from "./components/sections/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/book-test" element={<BookingSection />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/packages" element={<PackagesSection />} />
          //Admin
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

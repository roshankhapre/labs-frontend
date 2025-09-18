import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">HealthCheck Labs</h2>
          <p className="text-sm text-gray-400">
            Book your blood tests online and get results from the comfort of
            your home. Affordable, accurate, and quick lab services.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/packages" className="hover:underline">
                Test Packages
              </Link>
            </li>
            <li>
              <Link to="/book" className="hover:underline">
                Book a Test
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> +91 9876543210
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope /> info@healthchecklabs.com
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} HealthCheck Labs. All rights reserved.
      </div>
    </footer>
  );
}

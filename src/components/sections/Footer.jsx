import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { TestTube, Heart, Shield, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <TestTube className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                HealthCheck Labs
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Providing accurate and affordable diagnostic services with home
              sample collection. Trusted by thousands for precise results and
              compassionate care.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-blue-900/30 px-3 py-1 rounded-full">
                <Shield className="h-4 w-4 text-blue-400 mr-1" />
                <span className="text-xs text-blue-200">NABL Certified</span>
              </div>
              <div className="flex items-center bg-green-900/30 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-xs text-green-200">24H Reports</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/tests", label: "All Tests" },
                { path: "/packages", label: "Health Packages" },
                { path: "/book-test", label: "Book a Test" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tests */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">
              Popular Tests
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Complete Blood Count", slug: "cbc" },
                { name: "Diabetes Profile", slug: "diabetes" },
                { name: "Thyroid Profile", slug: "thyroid" },
                { name: "Liver Function Test", slug: "liver" },
                { name: "Vitamin D Test", slug: "vitamin-d" },
                { name: "Cardiac Markers", slug: "cardiac" },
              ].map((test) => (
                <li key={test.slug}>
                  <Link
                    to={`/tests?filter=${test.slug}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer text-sm"
                  >
                    {test.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <FaPhoneAlt className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">+91 9826043016</p>
                  <p className="text-sm text-gray-400">Mon-Sat: 7AM-9PM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <FaEnvelope className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-gray-400 break-all">
                    suyogpathalogyandlaboratory@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 p-2 rounded-lg mr-3 flex-shrink-0">
                  <FaMapMarkerAlt className="text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-400">
                    Indore, Madhya Pradesh
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-gray-300">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {[
                  {
                    icon: FaFacebook,
                    color: "hover:text-blue-400",
                    label: "Facebook",
                  },
                  {
                    icon: FaInstagram,
                    color: "hover:text-pink-400",
                    label: "Instagram",
                  },
                  {
                    icon: FaTwitter,
                    color: "hover:text-blue-300",
                    label: "Twitter",
                  },
                  {
                    icon: FaWhatsapp,
                    color: "hover:text-green-400",
                    label: "WhatsApp",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    aria-label={social.label}
                    className={`bg-gray-800 p-3 rounded-lg transition-all hover:bg-blue-600 ${social.color} transform hover:-translate-y-1`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6 bg-gray-800/50 rounded-xl">
          {[
            { icon: Clock, title: "Quick Results", desc: "Within 24-48 hours" },
            { icon: Shield, title: "Accurate Reports", desc: "NABL Certified" },
            {
              icon: FaMapMarkerAlt,
              title: "Home Collection",
              desc: "Free sample pickup",
            },
            {
              icon: Heart,
              title: "Expert Support",
              desc: "Doctor consultation",
            },
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} HealthCheck Labs. All rights
              reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Refund Policy
              </a>
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center mt-4 space-y-2">
            {/* Created by credit */}
            <p className="text-xs text-gray-500">
              Created by{" "}
              <a
                href="https://hiddenleaftechnologies.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Hidden Leaf Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import {
  FaFlask,
  FaUserShield,
  FaTruck,
  FaHeartbeat,
  FaAward,
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const reasons = [
  {
    title: "NABL Certified Labs",
    icon: <FaFlask className="text-2xl" />,
    desc: "We partner only with NABL-certified labs to ensure accurate results.",
    stats: "99.9% Accuracy",
    color: "bg-blue-500",
  },
  {
    title: "100% Safe & Hygienic",
    icon: <FaUserShield className="text-2xl" />,
    desc: "Proper sanitization and safety protocols followed by trained staff.",
    stats: "1000+ Safe Collections Daily",
    color: "bg-green-500",
  },
  {
    title: "Home Sample Collection",
    icon: <FaTruck className="text-2xl" />,
    desc: "Free doorstep sample collection at your preferred time.",
    stats: "Indore City Covered",
    color: "bg-purple-500",
  },
  {
    title: "Quick Reports",
    icon: <FaHeartbeat className="text-2xl" />,
    desc: "Most reports delivered within 24–48 hours, digitally or in print.",
    stats: "24-48 Hours Delivery",
    color: "bg-red-500",
  },
];

const stats = [
  { value: "50,000+", label: "Happy Patients", icon: <FaHeartbeat /> },
  { value: "200+", label: "Tests Available", icon: <FaFlask /> },
  { value: "50+", label: "Cities Covered", icon: <FaMapMarkerAlt /> },
  { value: "98%", label: "Satisfaction Rate", icon: <FaAward /> },
];

export default function WhyUsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      id="whyus"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-blue-50 opacity-50"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-100 opacity-30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <FaAward className="mr-2" /> Trusted by 50,000+ Patients
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Why <span className="text-blue-600">Choose Us?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            Your health is our priority. Experience safe, certified, and fast
            lab services — right from your home.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-500 text-2xl mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {reasons.map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl transform rotate-1 group-hover:rotate-3 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm border border-slate-100 p-6 md:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="flex flex-col items-center text-center mb-4">
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-2xl ${item.color} text-white text-3xl mb-5 shadow-lg group-hover:scale-110 transition duration-300`}
                  >
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.stats}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 md:mt-24 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your Trust Means Everything To Us
              </h3>
              <p className="text-gray-600">
                We're committed to providing the highest quality healthcare
                services
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center">
                <FaShieldAlt className="mr-2" /> <span>100% Secure</span>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center">
                <FaClock className="mr-2" /> <span>On Time Every Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to experience the difference?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Book Your Test Now
          </button>
        </div>
      </div>
    </section>
  );
}

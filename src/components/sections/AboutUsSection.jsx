import {
  ShieldCheck,
  Stethoscope,
  Clock,
  Users,
  Award,
  Heart,
  TestTube,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

// Import images
import ownerImage from "@/assets/Owner.webp";
import labImage1 from "@/assets/lab1.webp";
import labImage2 from "@/assets/lab2.webp";
import labImage3 from "@/assets/lab3.webp";
import labImage4 from "@/assets/lab4.webp";

export default function AboutUsSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      number: "50K+",
      label: "Happy Patients",
      color: "text-blue-600",
    },
    {
      icon: CheckCircle,
      number: "99.8%",
      label: "Accuracy Rate",
      color: "text-green-600",
    },
    {
      icon: Clock,
      number: "24",
      label: "Hour Reports",
      color: "text-amber-600",
    },
    {
      icon: Award,
      number: "150+",
      label: "Tests Available",
      color: "text-purple-600",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      text: "NABL Certified Labs",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Stethoscope,
      text: "Expert Doctors",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Heart,
      text: "Compassionate Care",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: TestTube,
      text: "Advanced Technology",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const labImages = [labImage1, labImage2, labImage3, labImage4];

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      id="about"
    >
      {/* Animated background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-50 opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-200 opacity-10 animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Heading with animation */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-1 rounded-full">
              ABOUT US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why{" "}
            <span className="text-blue-600 relative">
              Thousands Trust Us
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 6 C 70 6 70 4 140 4 L 200 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-blue-200"
                />
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delivering precision diagnostics with compassion since 2010
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Owner Image with decorative elements */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src={ownerImage}
                alt="Lab Owner"
                className="rounded-2xl shadow-xl w-full object-cover z-10 relative"
              />

              {/* Floating stats card */}
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg z-20">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">15+ Years</p>
                    <p className="text-sm text-gray-600">of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Name */}
          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-gray-800">
              Laboratory Director :{" "}
              <span className="text-blue-700">Dinesh Kalmodiya</span>
            </p>
          </div>

          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Your Health is Our <span className="text-blue-600">Priority</span>
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              At{" "}
              <span className="font-semibold text-blue-700">
                Suyog PathaLogy Lab
              </span>
              , we've been at the forefront of medical diagnostics for over a
              decade. Our commitment to accuracy, compassion, and cutting-edge
              technology has made us a trusted name in healthcare.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We believe that everyone deserves access to reliable health
              testing. That's why we've built a patient-centric approach with
              convenient home collection, transparent pricing, and timely
              reports you can trust for informed medical decisions.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-100"
                >
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${stat.color} bg-opacity-10`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Lab Photos Gallery */}
        <div className="mt-16">
          <h3 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-12">
            State-of-the-Art <span className="text-blue-600">Facilities</span>
          </h3>

          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={labImages[currentImage]}
              alt="Lab Facility"
              className="w-full h-full object-cover transition-opacity duration-1000"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {labImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentImage === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-sm font-medium text-gray-800">
                Advanced Diagnostic Technology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {labImages.map((img, index) => (
              <div
                key={index}
                className={`relative h-28 md:h-36 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  currentImage === index ? "ring-2 ring-blue-500" : "opacity-80"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <img
                  src={img}
                  alt={`Lab Facility ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {currentImage === index && (
                  <div className="absolute inset-0 bg-blue-600/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

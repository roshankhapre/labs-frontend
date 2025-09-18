// src/components/sections/HeroSection.jsx
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Clock,
  Stethoscope,
  ArrowRight,
  TestTube,
  BadgeCheck,
} from "lucide-react";
import heroImage from "../../assets/examining-sample-with-microscope.webp";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const texts = [
    "Book Blood Tests at Home",
    "Health Reports in 24 Hours",
    "Certified Lab Results",
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-purple-700/85"></div>

      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 py-16">
        {/* Left Content */}
        <div className="text-center lg:text-left lg:w-1/2">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm text-white mb-8 shadow-lg">
            <BadgeCheck className="w-4 h-4 mr-2 text-green-400" />
            <span>Indore’s Most Trusted Lab Services</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            <span className="block">Your Health,</span>
            <span className="block mt-2">Our Priority</span>
            <AnimatedTextCarousel texts={texts} />
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
            Experience professional lab testing from the comfort of your home.
            Certified technicians, accurate results, and seamless digital
            reports.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">200+</div>
              <div className="text-gray-300 text-sm">Tests Available</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">24H</div>
              <div className="text-gray-300 text-sm">Report Delivery</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-300 text-sm">Happy Patients</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-green-500 hover:bg-green-600 text-white text-lg font-medium px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              Book Test Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-blue-800 text-lg font-medium px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              View Packages
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span>NABL Certified Labs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-green-400" />
              <span>Same-Day Collection</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Stethoscope className="w-5 h-5 text-green-400" />
              <span>Expert Technicians</span>
            </div>
          </div>
        </div>

        {/* Right Content - How it Works */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl max-w-md hover:shadow-3xl transition-all duration-300">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center animate-bounce">
                  <TestTube className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-4">
                How It Works
              </h3>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Book Online",
                    desc: "Select test & schedule appointment",
                  },
                  {
                    step: "2",
                    title: "Home Collection",
                    desc: "Certified technician visits your home",
                  },
                  {
                    step: "3",
                    title: "Get Reports",
                    desc: "Receive digital reports within 24 hours",
                  },
                ].map((item) => (
                  <div className="flex items-start" key={item.step}>
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
              Most Trusted
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
              4.9/5 Rating
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce flex flex-col items-center">
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Animated Carousel with Fade + Slide */
function AnimatedTextCarousel({ texts }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 3000);
    return () => clearInterval(id);
  }, [texts.length]);

  return (
    <div className="relative mt-4 h-12 flex items-center justify-center lg:justify-start">
      {texts.map((t, i) => (
        <span
          key={i}
          className={`absolute text-2xl md:text-3xl lg:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-400 transition-all duration-700 ease-in-out ${
            i === index
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

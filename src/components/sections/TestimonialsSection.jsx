import {
  FaStar,
  FaQuoteLeft,
  FaUserCircle,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ravi Sharma",
      role: "Software Engineer",
      feedback:
        "HealthLab provided fast and reliable blood test results. The home collection service saved me so much time, and the phlebotomist was extremely professional. Results were delivered within 24 hours!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      location: "Bangalore",
    },
    {
      name: "Anjali Mehra",
      role: "Teacher",
      feedback:
        "Affordable and accurate lab tests. Their customer support was also great when I had to reschedule my appointment. The entire process was hassle-free and the reports were very detailed.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      location: "Mumbai",
    },
    {
      name: "Dr. Vikram Singh",
      role: "General Physician",
      feedback:
        "As a doctor, I recommend HealthLab to many patients due to its professional service and accurate reporting. Their NABL certification gives me confidence in their results.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      location: "Delhi",
    },
    {
      name: "Priya Patel",
      role: "Homemaker",
      feedback:
        "I booked a full body checkup for my elderly parents. The technician was patient and caring. The reports were easy to understand with doctor's recommendations. Excellent service!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      location: "Ahmedabad",
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      feedback:
        "We use HealthLab for our employee wellness programs. Their corporate packages are value for money and the team is always responsive to our needs. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
      location: "Hyderabad",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (currentIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-blue-50 opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-100 opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted by{" "}
            <span className="text-blue-600">Thousands of Patients</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our patients have to
            say about their experience with HealthLab.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors hidden md:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft className="text-blue-600 text-lg" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors hidden md:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <FaArrowRight className="text-blue-600 text-lg" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.name + index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
              >
                <div className="text-blue-100 text-4xl mb-4">
                  <FaQuoteLeft />
                </div>
                <div className="flex justify-start mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-yellow-400 text-sm md:text-base"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 flex-grow text-sm md:text-base leading-relaxed">
                  "{testimonial.feedback}"
                </p>
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center mt-8 md:hidden">
            <button
              onClick={prevTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors mx-2"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft className="text-blue-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors mx-2"
              aria-label="Next testimonial"
            >
              <FaArrowRight className="text-blue-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Rated 4.9/5 by 2,500+ Patients
              </h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers who trust HealthLab with
                their health
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg flex items-center text-sm">
                <FaStar className="mr-2 text-yellow-400" />{" "}
                <span>4.9/5 Rating</span>
              </div>
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg flex items-center text-sm">
                <FaUserCircle className="mr-2" /> <span>2,500+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Ready to experience our 5-star service?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            Book Your Test Now
          </button>
        </div>
      </div>
    </section>
  );
}

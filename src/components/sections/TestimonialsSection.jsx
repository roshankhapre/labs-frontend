import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Heart, Award, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      date: "2 days ago",
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
      date: "1 week ago",
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
      date: "3 days ago",
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
      date: "5 days ago",
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
      date: "2 weeks ago",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; i++) {
    const index = (currentIndex + i) % testimonials.length;
    visibleTestimonials.push(testimonials[index]);
  }
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4 mr-2" /> Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Patients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here's what our patients have to
            say about their experience with HealthLab.
          </p>
        </div>

        {/* Testimonials */}
        <div className="relative max-w-7xl mx-auto mb-16">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all hover:scale-110 hidden lg:flex items-center justify-center"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft className="text-blue-600 text-lg" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-4 rounded-full shadow-lg hover:bg-blue-50 transition-all hover:scale-110 hidden lg:flex items-center justify-center"
            aria-label="Next testimonial"
          >
            <FaArrowRight className="text-blue-600 text-lg" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.name + index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Quote icon */}
                <div className="text-blue-100 text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                  <FaQuoteLeft />
                </div>

                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-gray-700 mb-8 text-base leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                {/* Author */}
                <div className="flex items-center mt-auto pt-6 border-t border-gray-100">
                  <div className="flex-shrink-0 mr-4 relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{testimonial.location}</span>
                      <span className="mx-2">•</span>
                      <span>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-8 lg:hidden">
            <button
              onClick={prevTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all mx-2"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft className="text-blue-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-all mx-2"
              aria-label="Next testimonial"
            >
              <FaArrowRight className="text-blue-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8">
            {testimonials
              .slice(0, testimonials.length - visibleCount + 1)
              .map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-all ${
                    index === currentIndex
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2,500+</h3>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">24H</h3>
              <p className="text-gray-600">Report Time</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Experience Our 5-Star Service?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust HealthLab with their
            health diagnostics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/book-test")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Book Your Test Now
              </button>

              <button
                onClick={() => navigate("/tests")}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                View All Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

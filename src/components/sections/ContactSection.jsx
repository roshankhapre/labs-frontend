import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock,
  FaHeadset,
} from "react-icons/fa";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  // Function to handle WhatsApp message with predefined text
  const handleWhatsApp = () => {
    const phoneNumber = "919826043016";
    const predefinedMessage =
      "Hello, I would like to inquire about your pathology services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      predefinedMessage
    )}`;
    window.open(url, "_blank");
  };

  // Function to handle phone call
  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
      id="contact"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-blue-50 opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-purple-100 opacity-20"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions or need help with a booking? Our support team is here
            to assist you anytime.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Information */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaPhoneAlt className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Call Us
                    </h4>
                    <p
                      className="text-gray-600 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => handleCall("+919826043016")}
                    >
                      +91 98260 43016
                    </p>
                    <p className="text-sm text-gray-500">
                      Click to call directly
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaWhatsapp className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      WhatsApp
                    </h4>
                    <p
                      className="text-gray-600 mb-1 cursor-pointer hover:text-green-600 transition-colors"
                      onClick={handleWhatsApp}
                    >
                      +91 98260 43016
                    </p>
                    <p className="text-sm text-gray-500">
                      Click to send a message
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaEnvelope className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Email Us
                    </h4>
                    <p className="text-gray-600 mb-1">
                      suyogpathology@gmail.com
                    </p>
                    <p className="text-gray-600">info@suyogpathology.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Visit Us
                    </h4>
                    <p className="text-gray-600">
                      E-3126, Gopur Square, Sector E
                    </p>
                    <p className="text-gray-600">
                      Sudama Nagar, Indore, Madhya Pradesh 452009
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                    <FaClock className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Working Hours
                    </h4>
                    <p className="text-gray-600">Mon-Sat: 7:00 AM - 9:00 PM</p>
                    <p className="text-gray-600">Sunday: 8:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                  <FaHeadset className="text-blue-600 text-2xl mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      24/7 Support
                    </h4>
                    <p className="text-sm text-gray-600">For emergency cases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-3/5">
            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-600 mb-6">
                We'll get back to you within 24 hours
              </p>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="md:col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="md:col-span-1">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="test">Test Information</option>
                    <option value="billing">Billing Issue</option>
                    <option value="report">Report Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </div>

                <div className="md:col-span-2 text-center">
                  <p className="text-sm text-gray-500">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Our Location
              </h3>
              <p className="text-gray-600 mb-4">
                Visit our state-of-the-art facility for comprehensive health
                checkups and consultations.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Address:</span> E-3126, Gopur
                  Square, Sector E, Sudama Nagar
                </p>
                <p>
                  <span className="font-medium">City:</span> Indore, Madhya
                  Pradesh 452009
                </p>
                <p>
                  <span className="font-medium">Landmark:</span> Near Gopur
                  Square
                </p>
                <p>
                  <span className="font-medium">Parking:</span> Available
                </p>
              </div>
              <button
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg text-sm font-medium transition-colors"
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=E-3126+Gopur+Square+Sector+E+Sudama+Nagar+Indore+Madhya+Pradesh+452009",
                    "_blank"
                  )
                }
              >
                Get Directions
              </button>
            </div>

            <div className="md:w-2/3 h-64 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.328396763382!2d75.8589115758878!3d22.75308902790702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396302d5e5e5e5e5%3A0x5e5e5e5e5e5e5e5!2sE-3126%2C%20Gopur%20Square%2C%20Sector%20E%2C%20Sudama%20Nagar%2C%20Indore%2C%20Madhya%20Pradesh%20452009!5e0!3m2!1sen!2sin!4v1642345678901!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Suyog Pathology and Laboratory Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

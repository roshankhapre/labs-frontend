import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FaSearch,
  FaHome,
  FaFileMedical,
  FaMoneyBillWave,
  FaPhone,
  FaUserCheck,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqCategories = [
    { id: "all", label: "All Questions", icon: <FaSearch /> },
    { id: "booking", label: "Booking", icon: <FaUserCheck /> },
    { id: "collection", label: "Sample Collection", icon: <FaHome /> },
    { id: "results", label: "Results", icon: <FaFileMedical /> },
    { id: "payment", label: "Payment", icon: <FaMoneyBillWave /> },
  ];

  const faqItems = [
    {
      id: "q1",
      question: "How do I book a blood test?",
      answer:
        "You can book easily through our website or mobile app. Choose your test, pick a convenient time for sample collection, provide your details, and confirm your booking.",
      category: "booking",
    },
    {
      id: "q2",
      question: "Do you provide home sample collection?",
      answer:
        "Yes, we offer free home sample collection. Our trained staff will visit your location at your chosen time, following all hygiene protocols.",
      category: "collection",
    },
    {
      id: "q3",
      question: "How soon will I get my results?",
      answer:
        "Most test results are delivered within 24-48 hours. You will receive your reports digitally via email or WhatsApp.",
      category: "results",
    },
    {
      id: "q4",
      question: "What safety measures do you follow during collection?",
      answer:
        "Our team uses masks, gloves, and sanitized equipment. All materials are sterile and single-use to ensure safety.",
      category: "collection",
    },
    {
      id: "q5",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, UPI, net banking, and cash at the time of collection.",
      category: "payment",
    },
    {
      id: "q6",
      question: "Can I reschedule or cancel my appointment?",
      answer:
        "Yes, you can reschedule or cancel up to 2 hours before your scheduled time via our website or by contacting support.",
      category: "booking",
    },
    {
      id: "q7",
      question: "Do you offer corporate health checkup packages?",
      answer:
        "Yes, we provide corporate wellness packages with special pricing. Contact us for more details.",
      category: "booking",
    },
  ];

  const filteredFaqs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-blue-100 to-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-200 opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-50 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Quick answers to common queries about booking, sample collection,
            and reports.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-10 relative">
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 px-5 pr-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow-sm"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFaqs.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <AccordionTrigger className="flex items-center justify-between w-full px-6 py-5 text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    <span>{item.question}</span>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-5 pt-2 text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
              <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Support CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Still have questions?
          </h3>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Our support team is always ready to help you with your queries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+919826043016"
              className="bg-white text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <FaPhone className="mr-2" /> Call Us: +91 9826043016
            </a>
            <a
              href="mailto:support@healthlab.com"
              className="border border-white text-white font-medium py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .accordion-open\:hidden {
        }
        .accordion-open\:block {
        }

        @media (max-width: 768px) {
          .accordion-open\:hidden {
            display: none;
          }
          .accordion-open\:block {
            display: block;
          }
        }
      `}</style>
    </section>
  );
}

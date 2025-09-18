import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Clock,
  HeartPulse,
  Zap,
  Star,
  Calendar,
  FileText,
  Users,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";

const packages = [
  {
    id: 1,
    name: "Complete Health Checkup",
    price: "₹999",
    originalPrice: "₹1,899",
    discount: "47% OFF",
    features: [
      "Complete Blood Count (CBC)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "Thyroid Profile (T3, T4, TSH)",
      "Lipid Profile",
      "Diabetes Screening",
      "Vitamin D & B12",
      "Free Doctor Consultation",
    ],
    tests: "60+ Tests",
    reportTime: "24 Hours",
    popular: true,
    bestValue: true,
  },
  {
    id: 2,
    name: "Diabetes Care Package",
    price: "₹699",
    originalPrice: "₹1,299",
    discount: "46% OFF",
    features: [
      "Fasting Blood Sugar",
      "Postprandial Blood Sugar",
      "HbA1c (Glycated Hemoglobin)",
      "Complete Urine Examination",
      "Kidney Function Test",
      "Lipid Profile",
      "Free Dietician Consultation",
    ],
    tests: "25+ Tests",
    reportTime: "24 Hours",
    popular: false,
    bestValue: false,
  },
  {
    id: 3,
    name: "Women's Wellness Package",
    price: "₹1,499",
    originalPrice: "₹2,499",
    discount: "40% OFF",
    features: [
      "Complete Hemogram",
      "Thyroid Profile",
      "Vitamin D & B12",
      "Calcium & Iron Studies",
      "Hormonal Assay",
      "Bone Health Markers",
      "Cancer Screening Markers",
      "Gynecologist Consultation",
    ],
    tests: "45+ Tests",
    reportTime: "48 Hours",
    popular: false,
    bestValue: false,
  },
  {
    id: 4,
    name: "Executive Health Checkup",
    price: "₹2,499",
    originalPrice: "₹4,499",
    discount: "44% OFF",
    features: [
      "Comprehensive Health Profile",
      "Cardiac Risk Markers",
      "Diabetes Screening",
      "Liver & Kidney Function",
      "Thyroid Profile",
      "Vitamin Panel",
      "Cancer Screening",
      "ECG & Physician Consultation",
    ],
    tests: "80+ Tests",
    reportTime: "24 Hours",
    popular: false,
    bestValue: false,
  },
];

export default function PackagesSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      label: "All Packages",
      icon: <HeartPulse className="w-4 h-4" />,
    },
    { id: "basic", label: "Basic Health", icon: <Zap className="w-4 h-4" /> },
    {
      id: "comprehensive",
      label: "Comprehensive",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "specialized",
      label: "Specialized",
      icon: <Stethoscope className="w-4 h-4" />,
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      id="packages"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-blue-50 opacity-30"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-100 opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Award className="mr-2" /> Trusted by 50,000+ Patients
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Comprehensive <span className="text-blue-600">Health Packages</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Affordable, accurate and doctor-approved health checkups for{" "}
            <span className="font-semibold text-gray-800">
              early detection & prevention
            </span>
            .
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
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

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="relative group">
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"></div>
              )}

              {pkg.bestValue && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="px-4 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg">
                    Best Value
                  </Badge>
                </div>
              )}

              <Card className="h-full border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:-translate-y-2 bg-white/80 backdrop-blur-sm relative">
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {pkg.discount}
                </div>

                {/* Header */}
                <CardHeader className="pb-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white relative pt-6">
                  <CardTitle className="text-xl font-bold tracking-wide text-center">
                    {pkg.name}
                  </CardTitle>
                  <div className="flex flex-col items-center mt-4">
                    <div className="flex items-end justify-center gap-2">
                      <p className="text-3xl font-bold">{pkg.price}</p>
                      <p className="text-sm line-through opacity-80 mb-1">
                        {pkg.originalPrice}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <div className="flex items-center">
                        <FileText className="w-3 h-3 mr-1" /> {pkg.tests}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" /> {pkg.reportTime}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Features */}
                <CardContent className="pt-6 pb-5">
                  <ul className="space-y-3 text-left mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-gray-700 text-sm"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                    Book Now
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Home collection available</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Why Choose Our Health Packages?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-4 rounded-lg bg-blue-50">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                NABL Certified Labs
              </h4>
              <p className="text-gray-600 text-sm">
                Assured accuracy & reliability
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-green-50">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Expert Consultations
              </h4>
              <p className="text-gray-600 text-sm">
                Free doctor advice with packages
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-amber-50">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Fast Reports</h4>
              <p className="text-gray-600 text-sm">
                Delivered within 24-48 hours
              </p>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-50">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">
                50,000+ Patients
              </h4>
              <p className="text-gray-600 text-sm">
                Trusted healthcare partner
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Need help choosing the right package?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Speak to Our Expert
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all duration-300">
              View All Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

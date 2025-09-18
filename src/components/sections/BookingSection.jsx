import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  HeartPulse,
  Clock,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    address: "",
  });

  // Load Razorpay script safely
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay SDK loaded");
    script.onerror = () => console.error("Failed to load Razorpay SDK");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const timeSlots = [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeSelect = (time) => {
    setForm({ ...form, time });
  };

  // Razorpay Payment
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Step 1: Create Razorpay Order
      const { data } = await axios.post(
        "http://localhost:5000/api/payments/create-order"
      );

      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh the page.");
        setIsLoading(false);
        return;
      }

      // Step 2: Razorpay Options
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.order_id,
        name: "Lab Booking",
        description: "Appointment Booking Fee",
        handler: async function (response) {
          try {
            // Step 3: Verify Payment
            const verificationResponse = await axios.post(
              "http://localhost:5000/api/payments/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verificationResponse.data.success) {
              // Step 4: Save Booking
              const bookingRes = await axios.post(
                "http://localhost:5000/api/bookings/public",
                {
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  address: form.address,
                  appointmentDate: form.date,
                  appointmentTime: form.time,
                  amount: 50,
                  paymentInfo: {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  },
                }
              );

              if (bookingRes.data.success) {
                setStep(4);
              } else {
                alert("Booking failed: " + bookingRes.data.message);
              }
            } else {
              alert("Payment verification failed. Try again.");
            }
          } catch (err) {
            console.error("Error in payment handler:", err);
            alert("An error occurred. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#1e40af" },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
      };

      // Step 5: Open Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      alert("Failed to start payment. Try again.");
      setIsLoading(false);
    }
  };

  // Tomorrow min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Keep step safe (1–4 only)
  const safeStep = Math.min(Math.max(step, 1), 4);

  return (
    <section
      className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      id="booking"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <HeartPulse size={16} className="mr-2" />
            Over 10,000+ Appointments Booked Monthly
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your <span className="text-blue-600">Appointment</span> in 3
            Steps
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Secure your booking with a small fee of ₹50. Balance is payable at
            the time of service.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          {/* Progress Steps */}
          <div className="flex justify-center py-6 border-b bg-gray-50">
            <div className="flex space-x-16">
              {["Your Details", "Schedule", "Confirm"].map((label, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-semibold ${
                      safeStep >= i + 1
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {safeStep > i + 1 ? <CheckCircle2 size={24} /> : i + 1}
                  </div>
                  <span className="text-sm mt-2 font-medium text-gray-600">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="p-8">
            {/* Step 1 - Details */}
            {safeStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <User className="mr-2 h-6 w-6" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="flex items-center mb-2">
                      <User className="mr-2 h-4 w-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="py-3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center mb-2">
                      <Phone className="mr-2 h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter 10-digit phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      className="py-3"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center mb-2">
                    <Mail className="mr-2 h-4 w-4" />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={handleChange}
                    className="py-3"
                  />
                </div>
                <div className="pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6"
                    disabled={!form.name || !form.phone}
                  >
                    Continue <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2 - Schedule */}
            {safeStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <Calendar className="mr-2 h-6 w-6" />
                  Schedule Appointment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="date" className="flex items-center mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      Preferred Date *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="py-3"
                    />
                  </div>
                  <div>
                    <Label className="flex items-center mb-2">
                      <Clock className="mr-2 h-4 w-4" />
                      Preferred Time Slot *
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time, index) => (
                        <div
                          key={index}
                          className={`p-3 text-sm border rounded-lg text-center cursor-pointer transition-all ${
                            form.time === time
                              ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                              : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6"
                    disabled={!form.date || !form.time}
                  >
                    Continue <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 - Address + Confirm */}
            {safeStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <MapPin className="mr-2 h-6 w-6" />
                  Address & Confirm
                </h3>
                <div>
                  <Label htmlFor="address" className="flex items-center mb-2">
                    <MapPin className="mr-2 h-4 w-4" />
                    Collection Address *
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter complete address for sample collection"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="min-h-[100px] py-3"
                  />
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-5 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Booking Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{form.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{form.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{form.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{form.time}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium text-blue-600">
                        <span>Booking Fee:</span>
                        <span>₹50</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-blue-800 text-sm">
                    <strong>Note:</strong> A ₹50 booking fee is required to
                    secure your appointment. The remaining balance will be
                    payable at the time of service.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePayment}
                    disabled={!form.address || isLoading}
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6"
                  >
                    {isLoading ? (
                      <>Processing...</>
                    ) : (
                      <>Pay ₹50 & Confirm Booking</>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4 - Success */}
            {safeStep === 4 && (
              <div className="text-center py-10 px-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600 mb-2">
                  Thank you for your booking. Your appointment has been
                  scheduled successfully.
                </p>
                <p className="text-gray-600 mb-6">
                  We've sent a confirmation to your phone and email.
                </p>

                <div className="bg-gray-50 p-5 rounded-lg border max-w-md mx-auto mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Appointment Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{form.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{form.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference ID:</span>
                      <span className="font-medium">
                        LB{Math.floor(1000 + Math.random() * 9000)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      date: "",
                      time: "",
                      address: "",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6"
                >
                  Book Another Appointment
                </Button>
              </div>
            )}
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Quick Turnaround</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Most results available within 24-48 hours after sample collection.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Home Collection</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Our phlebotomist will visit your address for sample collection.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <HeartPulse className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold">Expert Care</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Certified professionals using modern equipment for accurate
              results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

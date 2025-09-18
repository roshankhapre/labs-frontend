// src/components/BookingForm.jsx
import { useState } from "react";
import axios from "axios";

const BookingForm = ({ selectedPackage }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Load Razorpay SDK dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Handle Payment + Booking
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Create Razorpay order from backend
      const { data } = await axios.post(
        "http://localhost:5000/api/payments/create-order"
      );

      const res = await loadRazorpay();
      if (!res) {
        alert("Failed to load Razorpay SDK");
        setLoading(false);
        return;
      }

      const options = {
        key: data.key, // From backend response
        amount: data.amount,
        currency: data.currency,
        name: "Lab Test Booking",
        description: "Advance Payment",
        order_id: data.order_id,
        handler: async function (response) {
          try {
            // Step 2: Verify payment on backend
            const verifyRes = await axios.post(
              "http://localhost:5000/api/payments/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              // Step 3: Create booking in backend
              // inside handleBooking success
              await axios.post("http://localhost:5000/api/bookings/public", {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                appointmentDate: formData.date, // ✅ match schema
                appointmentTime: formData.time, // ✅ match schema
                packageId: selectedPackage?._id, // ✅ send ID, not name
                paymentInfo: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                },
              });

              alert("✅ Booking Successful! Confirmation email sent.");
            } else {
              alert("❌ Payment Verification Failed");
            }
          } catch (err) {
            console.error(err);
            alert("Booking failed after payment.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#4F46E5",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleBooking}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-indigo-600">
        Book Your Lab Test
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full border rounded p-2"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border rounded p-2"
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        className="w-full border rounded p-2"
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Full Address"
        className="w-full border rounded p-2"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        className="w-full border rounded p-2"
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="time"
        className="w-full border rounded p-2"
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Processing..." : "Pay ₹50 & Book Now"}
      </button>
    </form>
  );
};

export default BookingForm;

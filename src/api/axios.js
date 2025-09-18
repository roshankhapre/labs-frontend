import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // ✅ allow cookies
  headers: {
    "Content-Type": "application/json",
  }, 
});

// ---------- AUTH ----------
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// ---------- ADMIN ----------
export const registerAdmin = (adminData) =>
  API.post("/admin/register", adminData);
export const loginAdmin = (adminData) => API.post("/admin/login", adminData);

// ---------- BOOKINGS ----------
export const getAllBookings = () =>
  API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

// ---------- PAYMENTS ----------
export const createPaymentOrder = (orderData) =>
  API.post("/payments/create-order", orderData);
export const verifyPayment = (paymentData) =>
  API.post("/payments/verify", paymentData);
export default API;

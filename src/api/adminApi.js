import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // ✅ allow cookies
});

import API from "./axios";

// Admin-specific APIs
export const registerAdmin = (adminData) =>
  API.post("/admin/register", adminData); // POST /api/admin/register

export const loginAdmin = (adminData) => API.post("/admin/login", adminData); // POST /api/admin/login

// Secure Bookings
export const getAllBookings = () =>
  API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

export default API;

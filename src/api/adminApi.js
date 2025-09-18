import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // ✅ allow cookies
});

export const registerAdmin = (adminData) =>
  API.post("/admin/register", adminData);
export const loginAdmin = (adminData) => API.post("/admin/login", adminData);
export const getAllBookings = () =>
  API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
export default API;

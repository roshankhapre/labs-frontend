import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // ✅ allow cookies
});

export const registerAdmin = (adminData) => API.post("/register", adminData);
export const loginAdmin = (adminData) => API.post("/auth/login", adminData);
export const getAllBookings = () =>
  API.get("/bookings", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
export default API;

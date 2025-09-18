import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 single source of truth
  withCredentials: false,
});

export default API;

import React, { useState } from "react";
import { loginAdmin, registerAdmin } from "@/api/adminApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdminLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        const res = await loginAdmin(formData);
        setMessage("Login successful!");
        localStorage.setItem("adminToken", res.data.token);
      } else {
        await registerAdmin(formData);
        setMessage("Admin registered successfully!");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Card className="max-w-sm mx-auto mt-10 p-6">
      <h2 className="text-xl font-bold mb-4">
        {isLogin ? "Admin Login" : "Register Admin"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" className="w-full">
          {isLogin ? "Login" : "Register"}
        </Button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {message && <p className="text-green-600 text-sm">{message}</p>}
      </form>

      <p
        onClick={() => setIsLogin(!isLogin)}
        className="text-sm text-center text-blue-600 mt-4 cursor-pointer"
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </Card>
  );
}

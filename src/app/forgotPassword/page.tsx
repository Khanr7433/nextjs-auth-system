"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/users/forgotPassword", {
        email,
      });

      if (response.status === 200) {
        toast.success("Password reset email sent successfully");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to send reset link"
        );
      } else {
        toast.error("Failed to send reset link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password</h1>
      <form className="flex flex-col">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 m-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="p-2 m-2 bg-blue-500 text-white rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

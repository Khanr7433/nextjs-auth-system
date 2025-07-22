"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PasswordResetPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    if (!urlToken) {
      toast.error("No reset token found. Please check your email link.");
    }
  }, []);

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Resetting your password...", { id: "resetPassword" });

      await axios.post("/api/users/resetPassword", {
        token,
        password,
        confirmPassword,
      });

      toast.success(
        "Password reset successfully! You can now log in with your new password.",
        { id: "resetPassword" }
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to reset password";
        toast.error(`Reset failed: ${errorMessage}`, { id: "resetPassword" });
      } else {
        toast.error(
          "Unable to reset password. Please try again or request a new reset link.",
          { id: "resetPassword" }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fadeIn">
          <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m0 0v4a2 2 0 01-2 2m0 0H9a2 2 0 01-2-2m0 0V9a2 2 0 012-2m0 0a2 2 0 012-2m0 0h4"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {loading ? "Resetting password..." : "Reset Password"}
          </h2>
          <p className="text-blue-100">Enter your new password below</p>
        </div>

        {/* Reset Form */}
        <div className="glass rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/90"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                disabled={loading}
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-white/90"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                disabled={loading}
                minLength={6}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !password || !confirmPassword}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 ${
              loading || !password || !confirmPassword
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Resetting password...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>

          <div className="text-center">
            <p className="text-gray-700 text-sm">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
              >
                Back to login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      setLoading(true);
      toast.loading("Verifying your email address...", { id: "verify" });

      await axios.post("/api/users/verifyEmail", { token });

      setVerified(true);
      toast.success(
        "Email verified successfully! You can now log in to your account.",
        { id: "verify" }
      );
    } catch (error: unknown) {
      setError(true);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Email verification failed";
        toast.error(`Verification failed: ${errorMessage}`, { id: "verify" });
      } else {
        toast.error(
          "Email verification failed. The link may be expired or invalid.",
          { id: "verify" }
        );
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    if (!urlToken) {
      toast.error("No verification token found. Please check your email link.");
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fadeIn">
          <div className="mx-auto h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            {loading ? (
              <svg
                className="animate-spin h-10 w-10 text-white"
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
            ) : verified ? (
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : error ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {loading
              ? "Verifying..."
              : verified
                ? "Email Verified!"
                : error
                  ? "Verification Failed"
                  : "Email Verification"}
          </h2>
          <p className="text-blue-100">
            {loading
              ? "Please wait while we verify your email"
              : verified
                ? "Your email has been successfully verified"
                : error
                  ? "There was an issue verifying your email"
                  : "Verifying your email address"}
          </p>
        </div>

        {/* Content Card */}
        <div className="glass rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-pulse-custom">
                <div className="h-4 bg-blue-200 rounded-full w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-blue-200 rounded-full w-1/2 mx-auto"></div>
              </div>
              <p className="text-gray-600 mt-4">
                Verifying your email address...
              </p>
            </div>
          )}

          {verified && (
            <div className="text-center py-8 animate-slideIn">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Verification Successful!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your email has been verified. You can now log in to your
                  account.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Continue to Login
              </Link>
            </div>
          )}

          {error && (
            <div className="text-center py-8 animate-slideIn">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Verification Failed
                </h3>
                <p className="text-gray-600 mb-6">
                  There was an issue verifying your email. The link may be
                  expired or invalid.
                </p>
              </div>
              <div className="space-y-3">
                <Link
                  href="/signup"
                  className="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
                >
                  Try Again
                </Link>
                <Link
                  href="/login"
                  className="block w-full px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-center"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {!loading && !verified && !error && token && (
            <div className="text-center py-8">
              <div className="animate-pulse">
                <div className="h-4 bg-blue-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          )}

          {/* Debug info - remove in production */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-xs text-gray-500 font-mono">
                Token:{" "}
                {token ? token.substring(0, 20) + "..." : "No token found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

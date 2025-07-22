"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [userData, setUserData] = useState<{
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-load user details when component mounts
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      toast.loading("Signing you out...", { id: "logout" });
      await axios.get("/api/users/logout");
      toast.success("Successfully signed out. See you soon!", { id: "logout" });
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to sign out";
        toast.error(`Logout failed: ${errorMessage}`, { id: "logout" });
      } else {
        toast.error("Unable to sign out. Please try again.", { id: "logout" });
      }
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      toast.loading("Loading your profile...", { id: "getUserDetails" });
      const res = await axios.get("/api/users/getUser");
      setData(res.data.data._id);
      setUserData(res.data.data);
      toast.success("Profile loaded successfully!", { id: "getUserDetails" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || "Failed to load profile";
        toast.error(`Error: ${errorMessage}`, { id: "getUserDetails" });
      } else {
        toast.error("Unable to load profile. Please try again.", {
          id: "getUserDetails",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Profile</h1>
          <p className="text-blue-100">
            Manage your account information and settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-2xl shadow-2xl p-8 mb-8 animate-fadeIn">
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin mx-auto h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-700">Loading your profile...</p>
              </div>
            ) : userData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border">
                      <p className="text-gray-900 font-medium">
                        {userData.username}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border">
                      <p className="text-gray-900">{userData.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      User ID
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border">
                      <p className="text-gray-900 font-mono text-sm">
                        {userData._id}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Verification Status
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          userData.isVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {userData.isVerified
                          ? "Verified"
                          : "Pending Verification"}
                      </span>
                    </div>
                  </div>
                </div>

                {data !== "nothing" && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Profile Link:</strong>
                    </p>
                    <Link
                      href={`/profile/${data}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View Public Profile
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-700 mb-4">No profile data loaded</p>
                <button
                  onClick={getUserDetails}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
                >
                  Load Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
          <button
            onClick={getUserDetails}
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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
                Loading...
              </div>
            ) : (
              "Refresh Profile"
            )}
          </button>

          <button
            onClick={logout}
            className="px-8 py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

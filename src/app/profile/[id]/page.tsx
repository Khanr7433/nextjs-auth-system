import Link from "next/link";

interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
          <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
          <p className="text-blue-100">Public profile information</p>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-2xl shadow-2xl p-8 mb-8 animate-fadeIn">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Details
              </h2>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User ID
                  </label>
                  <div className="flex items-center justify-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-100 text-blue-800 font-mono text-sm border">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-4 0v2m0 6h.01"
                        />
                      </svg>
                      {params.id}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    This is a public profile page. Only basic information is
                    displayed for privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center animate-fadeIn">
          <Link
            href="/profile"
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transition-all duration-200"
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to My Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

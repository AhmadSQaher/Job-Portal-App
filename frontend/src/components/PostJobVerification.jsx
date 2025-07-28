import React from "react";
import { Link } from "react-router-dom";

const PostJobVerification = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Post Job Access Verification
          </h1>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Test Post Job (No Authentication Required)
              </h2>
              <p className="text-green-700 mb-3">
                This page should be accessible without logging in.
              </p>
              <Link
                to="/post-job-test"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Access Test Post Job Form
              </Link>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                🔒 Real Post Job (Requires Authentication)
              </h2>
              <p className="text-blue-700 mb-3">
                This page requires employer authentication.
              </p>
              <Link
                to="/post-job"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Real Post Job Form (Will Redirect to Login)
              </Link>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                🧪 Quick Test Links
              </h2>
              <div className="space-y-2">
                <Link
                  to="/simple-css-test"
                  className="block text-yellow-700 hover:text-yellow-800 underline"
                >
                  • Simple CSS Test
                </Link>
                <Link
                  to="/dashboard-test"
                  className="block text-yellow-700 hover:text-yellow-800 underline"
                >
                  • Dashboard Test (No Auth)
                </Link>
                <Link
                  to="/login-test"
                  className="block text-yellow-700 hover:text-yellow-800 underline"
                >
                  • Login Test
                </Link>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                If you're still seeing authentication requirements, please
                check:
              </p>
              <ul className="text-sm text-gray-500 mt-2 space-y-1">
                <li>
                  • You're using the correct URL:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    /post-job-test
                  </code>
                </li>
                <li>
                  • The server is running on{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    http://localhost:5185/
                  </code>
                </li>
                <li>
                  • You're not accidentally accessing{" "}
                  <code className="bg-gray-100 px-1 rounded">/post-job</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobVerification;

import React from "react";

const CSS_Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            CSS Test Page
          </h1>
          <p className="text-gray-600 mb-6">
            If you can see this styled component with colors, shadows, and
            proper spacing, then Tailwind CSS is working correctly!
          </p>

          <div className="space-y-3">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-800">
              ✅ Blue background with rounded corners
            </div>
            <div className="bg-green-100 p-3 rounded-lg text-green-800">
              ✅ Green background with proper padding
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-800">
              ✅ Yellow background with text styling
            </div>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-800">
              ✅ Purple background with responsive design
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Test Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSS_Test;

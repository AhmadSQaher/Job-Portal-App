import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          🚀 LINX Job Portal
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Job Portal!</h2>
          <p className="text-gray-600 mb-6">
            React is now successfully mounting! The frontend is working correctly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">For Job Seekers</h3>
              <p className="text-sm text-blue-600">Find your dream career</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">For Employers</h3>
              <p className="text-sm text-green-600">Hire top talent</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800">For Everyone</h3>
              <p className="text-sm text-purple-600">Connect and grow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

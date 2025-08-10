import React from "react";
import SplineEmbedTest from "../components/SplineEmbedTest";

const SplineTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Spline Test Page</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">3D Robot Test</h2>
          <SplineEmbedTest />
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">Check the browser console for any errors</p>
        </div>
      </div>
    </div>
  );
};

export default SplineTestPage;

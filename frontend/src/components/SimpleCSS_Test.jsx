import React from "react";

const SimpleCSS_Test = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">CSS Test</h1>
      <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
        Red background with white text
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg mb-4">
        Green background with white text
      </div>
      <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
        Blue background with white text
      </div>
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
        Test Button
      </button>
    </div>
  );
};

export default SimpleCSS_Test;

// TestCentering.jsx
import React from 'react';

const TestCentering = () => {
  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-black flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-gray-800 text-center text-xl">Questo è un test di centratura.</p>
        <div className="bg-blue-200 h-20 w-20 mx-auto mt-4"></div> {/* Un blocco per visibilità */}
      </div>
    </div>
  );
};

export default TestCentering;
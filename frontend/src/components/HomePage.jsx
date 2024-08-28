import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Training Modules</h1>
      <div className="mb-4">
        <Link to="/create-module" className="bg-blue-500 text-white py-2 px-4 rounded mr-4">
          Create Module
        </Link>
        <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">
          Login
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-2">Available Modules</h2>
      {/* Display list of modules */}
    </div>
  );
};

export default HomePage;

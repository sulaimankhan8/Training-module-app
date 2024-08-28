import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data } = await axios.get('/api/modules');
        setModules(data);
      } catch (err) {
        setError('Failed to load modules');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-600">Training Modules</h1>
      <div className="flex justify-between mb-6">
        <Link to="/create-module" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
          Create Module
        </Link>
        <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Login
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <ul className="space-y-4">
          {modules.map((mod) => (
            <li key={mod._id} className="bg-white p-4 shadow-lg rounded-md hover:bg-gray-50 transition">
              <Link to={`/module/${mod._id}`} className="text-xl text-blue-700 hover:text-blue-900 font-semibold">
                {mod.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;

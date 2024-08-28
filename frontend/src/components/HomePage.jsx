import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [modules, setModules] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      const { data } = await axios.get('/api/modules');
      setModules(data);
    };

    fetchModules();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Training Modules</h1>
      
      {user ? (
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded">
            Login
          </Link>
        </div>
      )}

      <div className="mb-4">
        <Link
          to="/create-module"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Create New Module
        </Link>
      </div>

      <ul className="list-disc list-inside">
        {modules.map((mod) => (
          <li key={mod._id} className="mb-2">
            <Link to={`/module/${mod._id}`} className="text-blue-500 hover:underline">
              {mod.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

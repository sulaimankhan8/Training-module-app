import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      const { data } = await axios.get('/api/modules');
      setModules(data);
    };

    fetchModules();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Training Modules</h1>
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

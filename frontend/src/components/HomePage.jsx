import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      const { data } = await axios.get('/api/modules');
      setModules(data);
    };

    fetchModules();
  }, []);

  return (
    <div>
      <h1>Training Modules</h1>
      <ul>
        {modules.map((mod) => (
          <li key={mod._id}>
            <Link to={`/module/${mod._id}`}>{mod.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

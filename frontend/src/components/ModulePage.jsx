import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ModulePage() {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchModule = async () => {
      const { data } = await axios.get(`/api/modules/${id}`);
      setModuleData(data);
    };

    fetchModule();
  }, [id]);

  return (
    <div>
      {moduleData && (
        <>
          <h2>{moduleData.title}</h2>
          <div>
            <h3>{moduleData.pages[currentPage].title}</h3>
            <p>{moduleData.pages[currentPage].content}</p>
            {/* Replace with your video component or tag */}
          </div>
        </>
      )}
    </div>
  );
}

export default ModulePage;

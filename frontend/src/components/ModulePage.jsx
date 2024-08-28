import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

const ModulePage = () => {
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

  const handleNextPage = () => {
    if (currentPage < moduleData.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {moduleData && (
        <>
          <h2 className="text-3xl font-bold mb-4">{moduleData.title}</h2>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold mb-2">{moduleData.pages[currentPage].title}</h3>
            <p className="mb-4">{moduleData.pages[currentPage].content}</p>
            <VideoPlayer
              videoUrl={moduleData.pages[currentPage].videoUrl}
              moduleId={moduleData._id}
              pageId={moduleData.pages[currentPage]._id}
              onEnd={handleNextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ModulePage;

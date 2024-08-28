import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';

const ModulePage = ({ match }) => {
  const [module, setModule] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await axios.get(`/api/modules/${match.params.id}`);
        setModule(response.data);
      } catch (error) {
        console.error('Error fetching module:', error);
      }
    };

    fetchModule();
  }, [match.params.id]);

  const handleVideoProgress = (currentTime, duration) => {
    setProgress((currentTime / duration) * 100);
  };

  const handleVideoEnd = () => {
    if (currentPageIndex < (module.pages.length - 1)) {
      setCurrentPageIndex(currentPageIndex + 1);
      setProgress(0);
    }
  };

  if (!module) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{module.title}</h1>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-2">{module.pages[currentPageIndex].title}</h2>
          <p className="mb-4">{module.pages[currentPageIndex].content}</p>
          <video
            controls
            onTimeUpdate={(e) => handleVideoProgress(e.target.currentTime, e.target.duration)}
            onEnded={handleVideoEnd}
            className="w-full"
            src={module.pages[currentPageIndex].videoUrl}
          />
        </div>
        <div className="w-1/2 p-4">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default ModulePage;

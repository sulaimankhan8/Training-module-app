import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import ProgressTracker from './ProgressTracker';

const ModulePage = () => {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const fetchModule = async () => {
      const { data } = await axios.get(`/api/modules/${id}`);
      setModule(data);
    };

    fetchModule();
  }, [id]);

  const handleProgressUpdate = async (pageId, watchedDuration) => {
    await axios.post('/api/users/progress', {
      userId: localStorage.getItem('userId'),
      moduleId: id,
      pageId,
      watchedDuration,
    });
    setProgress((prevProgress) => ({
      ...prevProgress,
      [pageId]: watchedDuration,
    }));
  };

  if (!module) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{module.title}</h1>
      {module.pages.map((page, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold">{page.title}</h2>
          <p>{page.content}</p>
          <VideoPlayer
            url={page.videoUrl}
            onProgressUpdate={(watchedDuration) => handleProgressUpdate(page._id, watchedDuration)}
          />
          <ProgressTracker watchedDuration={progress[page._id] || 0} />
        </div>
      ))}
    </div>
  );
};

export default ModulePage;

import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const { data } = await axios.post('/api/modules/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(data.url);
    } catch (error) {
      console.error('Failed to upload video');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="video/*" className="border border-gray-300 p-2 rounded mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded">
        Upload Video
      </button>
    </div>
  );
};

export default VideoUpload;

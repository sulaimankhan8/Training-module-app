import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = ({ onUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const { data } = await axios.post('/api/modules/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUpload(data.url);
    } catch (error) {
      console.error('Failed to upload video', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        onChange={handleFileChange}
        accept="video/*"
        className="border border-gray-300 p-2 rounded mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default VideoUpload;

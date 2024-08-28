import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('/api/modules/upload', formData);
      onUpload(response.data.url);
      setUploading(false);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleUpload}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${uploading ? 'opacity-50' : ''}`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
};

export default VideoUpload;

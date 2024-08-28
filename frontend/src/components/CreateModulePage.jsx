import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateModulePage = () => {
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState([{ title: '', content: '', videoUrl: '' }]);
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  const handleAddPage = () => {
    setPages([...pages, { title: '', content: '', videoUrl: '' }]);
  };

  const handlePageChange = (index, e) => {
    const newPages = [...pages];
    newPages[index][e.target.name] = e.target.value;
    setPages(newPages);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let videoUrl = '';
    if (video) {
      const formData = new FormData();
      formData.append('video', video);
      
      const uploadRes = await axios.post('/api/modules/upload', formData);
      videoUrl = uploadRes.data.url;
    }

    const moduleData = { title, pages: pages.map(page => ({ ...page, videoUrl })) };
    
    await axios.post('/api/modules', moduleData);
    navigate('/confirmation');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create New Module</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Module Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        {pages.map((page, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-semibold">Page {index + 1}</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={page.title}
                onChange={(e) => handlePageChange(index, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                value={page.content}
                onChange={(e) => handlePageChange(index, e)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                rows="4"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">Video Upload</label>
              <input
                type="file"
                onChange={handleVideoChange}
                className="mt-1 block w-full"
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={handleAddPage}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Page
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Create Module
        </button>
      </form>
    </div>
  );
};

export default CreateModulePage;

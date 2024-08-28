import React, { useState } from 'react';
import axios from 'axios';
import VideoUpload from './VideoUpload';

const CreateModulePage = () => {

  const [pages, setPages] = useState([{ title: '', content: '', videoUrl: '' }]);
  const [moduleTitle, setModuleTitle] = useState('');

  const handlePageChange = (index, field, value) => {
    const newPages = [...pages];
    newPages[index][field] = value;
    setPages(newPages);
  };

  const addPage = () => {
    setPages([...pages, { title: '', content: '', videoUrl: '' }]);
  };

  const removePage = (index) => {
    const newPages = pages.filter((_, i) => i !== index);
    setPages(newPages);
  };

  const handleVideoUpload = async (index, videoUrl) => {
    const newPages = [...pages];
    newPages[index].videoUrl = videoUrl;
    setPages(newPages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/modules', { title: moduleTitle, pages }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
      });
      // Handle success, e.g., redirect to the home page or show a success message
    } catch (error) {
      console.error('Failed to create module');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Module</h1>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <input
          type="text"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
          placeholder="Module Title"
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        {pages.map((page, index) => (
          <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-md">
            <div className="flex">
              <div className="flex-1 pr-4">
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => handlePageChange(index, 'title', e.target.value)}
                  placeholder="Page Title"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                />
                <textarea
                  value={page.content}
                  onChange={(e) => handlePageChange(index, 'content', e.target.value)}
                  placeholder="Page Content"
                  className="border border-gray-300 p-2 rounded w-full mb-2"
                />
              </div>
              <div className="flex-1 pl-4">
                <VideoUpload onUpload={(videoUrl) => handleVideoUpload(index, videoUrl)} />
                {/* Progress tracker (to be implemented based on video progress) */}
              </div>
            </div>
            <button
              type="button"
              onClick={() => removePage(index)}
              className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600 transition"
            >
              Remove Page
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPage}
          className="bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-600 transition"
        >
          Add Page
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Create Module
        </button>
      </form>
    </div>
  );
};

export default CreateModulePage;

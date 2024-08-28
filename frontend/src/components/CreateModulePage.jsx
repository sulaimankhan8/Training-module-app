import React, { useState } from 'react';
import axios from 'axios';
import VideoUpload from './VideoUpload';
import ProgressBar from './ProgressBar';

const CreateModulePage = () => {
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState({ title: '', content: '', videoUrl: '' });
  const [uploading, setUploading] = useState(false);

  const handlePageChange = (e) => {
    setCurrentPage({ ...currentPage, [e.target.name]: e.target.value });
  };

  const handleAddPage = () => {
    setPages([...pages, currentPage]);
    setCurrentPage({ title: '', content: '', videoUrl: '' });
  };

  const handleSubmit = async () => {
    setUploading(true);
    try {
      await axios.post('/api/modules', { title, pages });
      alert('Module created successfully');
      setUploading(false);
    } catch (error) {
      console.error('Error creating module:', error);
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Module</h1>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Module Title"
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />
      <div>
        <h2 className="text-2xl font-semibold mb-2">Add Page</h2>
        <input
          type="text"
          name="title"
          value={currentPage.title}
          onChange={handlePageChange}
          placeholder="Page Title"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <textarea
          name="content"
          value={currentPage.content}
          onChange={handlePageChange}
          placeholder="Page Content"
          className="border border-gray-300 p-2 rounded mb-2 w-full"
        />
        <VideoUpload onUpload={(url) => setCurrentPage({ ...currentPage, videoUrl: url })} />
        <button
          onClick={handleAddPage}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Page
        </button>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Pages</h3>
          {pages.map((page, index) => (
            <div key={index} className="mb-2 p-2 border border-gray-200 rounded">
              <h4 className="text-lg font-bold">{page.title}</h4>
              <p>{page.content}</p>
              <video controls src={page.videoUrl} className="w-full mt-2"></video>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className={`bg-green-500 text-white py-2 px-4 rounded mt-4 ${uploading ? 'opacity-50' : ''}`}
          disabled={uploading}
        >
          {uploading ? 'Creating Module...' : 'Create Module'}
        </button>
      </div>
    </div>
  );
};

export default CreateModulePage;

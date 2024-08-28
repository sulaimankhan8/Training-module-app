import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Module Created Successfully</h1>
      <p>Your module has been created and saved.</p>
      <button
        onClick={handleHomeRedirect}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;

import React from 'react';

const ProgressTracker = ({ watchedDuration }) => {
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-600">Watched Duration: {watchedDuration} seconds</p>
    </div>
  );
};

export default ProgressTracker;

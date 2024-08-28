import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-semibold mb-2">Progress</h2>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-500">
            {Math.round(progress)}%
          </div>
        </div>
        <div className="flex">
          <div
            className="bg-blue-600 text-xs leading-none py-1 text-center text-white whitespace-nowrap"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

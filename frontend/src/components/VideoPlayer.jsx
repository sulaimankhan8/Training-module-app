import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ url, onProgressUpdate }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      const duration = videoElement.duration;
      const currentTime = videoElement.currentTime;
      const watchedDuration = Math.floor(currentTime);
      setProgress(watchedDuration);
      onProgressUpdate(watchedDuration);
    };

    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [onProgressUpdate]);

  return (
    <div className="mb-4">
      <video
        ref={videoRef}
        src={url}
        controls
        className="w-full h-auto"
        onClick={() => videoRef.current.play()}
      >
        Your browser does not support the video tag.
      </video>
      <p className="text-sm text-gray-600">Current Progress: {progress} seconds</p>
    </div>
  );
};

export default VideoPlayer;

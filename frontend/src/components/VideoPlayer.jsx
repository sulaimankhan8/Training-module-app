import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import axios from 'axios';

const VideoPlayer = ({ videoUrl, moduleId, pageId, onEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      controlBar: {
        progressControl: {
          seekBar: {
            mouseTimeDisplay: false,
          },
        },
        currentTimeDisplay: false,
        timeDivider: false,
        durationDisplay: false,
        remainingTimeDisplay: false,
      },
    });

    player.src({ type: 'video/mp4', src: videoUrl });

    player.on('ended', async () => {
      await axios.post('/api/users/progress', {
        moduleId,
        pageId,
        watchedDuration: player.currentTime(),
      });
      onEnd();
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoUrl, moduleId, pageId, onEnd]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
      </div>
    </div>
  );
};

export default VideoPlayer;

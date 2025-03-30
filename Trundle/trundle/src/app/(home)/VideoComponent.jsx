'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Image from 'next/image';

const VideoComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStart, setIsPlayinsetIsStart] = useState(false);

  const handleVideoPlay = () => {
    setIsPlayinsetIsStart(true);
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`exp-media-box mb-0 pb-0 ${isPlaying ? 'playing' : ''}`}>
      {!isStart &&
        <img src="/images/experience/video-img.jpeg" alt="" />
      }
      <ReactPlayer
        url="https://youtu.be/rdFjsRYHd90?si=5cvRVP34oGniO17e"
        playing={isPlaying}
        controls
        width="100%"
        height="100%"
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        light="/images/experience/video-img.jpeg" /* Reference the public path */
        playIcon={
          <button
            className="exp-media-play-btn d-flex align-items-center justify-content-center"
            onClick={handleVideoPlay}
          >
            <Image
              src="/images/experience/play-icon.svg"
              alt="Play Button"
              width={100}
              height={100}
              quality={100}
            />
          </button>
        }
      />
    </div>
  );
};

export default VideoComponent;

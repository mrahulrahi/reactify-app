import React from "react";

export default function VideoPlayer({ videoUrl }) {
  // Extract video ID from YouTube URL
  const getYoutubeId = (url) => {
    const regExp = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"\n\s?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  return (
    <div className="video-container">
      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Invalid YouTube URL</p>
      )}
    </div>
  );
}

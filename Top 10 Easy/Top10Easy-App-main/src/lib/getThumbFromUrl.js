export default function getThumbFromUrl(videoUrl) {

  const getVideoId = (url) => {
    if (!url) return null; // Ensure URL is valid before using match
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^&?]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);

  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  return thumbnailUrl
}

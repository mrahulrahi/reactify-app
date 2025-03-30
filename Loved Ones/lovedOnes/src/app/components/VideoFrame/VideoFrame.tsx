'use client'
import './VideoFrame.css'
import { useState, useRef, useEffect } from 'react'

type VideoFrameProps = {
    thumbnailSrc: string;
    videoSrc: string;
    videoFit?: string;
}

const VideoFrame = ({ thumbnailSrc, videoSrc, videoFit = 'cover' }: VideoFrameProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (videoContainerRef.current && !videoContainerRef.current.contains(event.target as Node)) {
                handlePause();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={videoContainerRef} className={`video-frame ${isPlaying ? "playing" : ""}`}>
            <video ref={videoRef} src={videoSrc} controls={isPlaying} poster={thumbnailSrc} className={`object-fit-${videoFit}`} onClick={isPlaying ? handlePause : handlePlay} />
            {!isPlaying && (
                <button type="button" className="play-btn" onClick={handlePlay} />
            )}
        </div>
    )
}

export default VideoFrame
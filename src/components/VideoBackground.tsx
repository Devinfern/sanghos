
import React, { useState, useEffect } from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  overlayOpacity?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrl, 
  overlayOpacity = "bg-black/40" // default 40% opacity black overlay
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Create a prefetch mechanism for the video
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.onloadeddata = () => setIsVideoLoaded(true);
    videoElement.onerror = () => {
      console.error('Error loading video:', videoUrl);
      setIsVideoLoaded(false);
    };
    
    // Clean up
    return () => {
      videoElement.onloadeddata = null;
      videoElement.onerror = null;
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <div className={`absolute inset-0 ${overlayOpacity} z-10`} />
      {isVideoLoaded ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute inset-0 bg-sage-900"></div>
      )}
    </div>
  );
};

export default VideoBackground;

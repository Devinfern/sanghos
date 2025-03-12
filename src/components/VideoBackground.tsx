
import React, { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface VideoBackgroundProps {
  videoUrl?: string;
  imageUrl?: string;
  overlayOpacity?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrl, 
  imageUrl,
  overlayOpacity = "bg-black/40" // default 40% opacity black overlay
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageUsed, setIsImageUsed] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If imageUrl is provided, use image instead of video
    if (imageUrl) {
      setIsImageUsed(true);
      
      // Preload the image to check if it loads
      const img = new Image();
      img.onload = () => {
        setIsImageLoaded(true);
        setHasError(false);
      };
      img.onerror = () => {
        console.error('Error loading image:', imageUrl);
        setHasError(true);
      };
      img.src = imageUrl;
      
      return;
    }
    
    if (!videoUrl) return;

    // Create a prefetch mechanism for the video
    const videoElement = document.createElement('video');
    videoElement.src = videoUrl;
    videoElement.onloadeddata = () => setIsVideoLoaded(true);
    videoElement.onerror = () => {
      console.error('Error loading video:', videoUrl);
      setIsVideoLoaded(false);
      setHasError(true);
    };
    
    // Clean up
    return () => {
      videoElement.onloadeddata = null;
      videoElement.onerror = null;
    };
  }, [videoUrl, imageUrl]);

  // Add console logs to debug
  console.log({
    isImageUsed,
    isImageLoaded,
    isVideoLoaded,
    hasError,
    imageUrl,
    videoUrl
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <div className={`absolute inset-0 ${overlayOpacity} z-10`} />
      
      {isImageUsed && imageUrl ? (
        <div className="absolute inset-0 w-full h-full">
          <OptimizedImage 
            src={imageUrl} 
            alt="Background" 
            className="w-full h-full" 
            aspectRatio="custom"
            objectFit="cover"
            onLoad={() => console.log("OptimizedImage loaded successfully")}
          />
        </div>
      ) : isVideoLoaded && videoUrl ? (
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

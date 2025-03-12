
import React from 'react';

interface VideoBackgroundProps {
  videoUrl: string;
  overlayOpacity?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoUrl, 
  overlayOpacity = "bg-black/40" // default 40% opacity black overlay
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      <div className={`absolute inset-0 ${overlayOpacity} z-10`} />
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;


import { useState, useEffect, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loadingClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "custom";
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  style?: CSSProperties;
  onLoad?: () => void;
}

const AspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  custom: ""
};

const OptimizedImage = ({
  src,
  alt,
  className = "",
  loadingClassName = "bg-muted animate-pulse",
  aspectRatio = "square",
  priority = false,
  objectFit = "cover",
  style,
  onLoad
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // For priority images, preload them
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
      console.log(`Preloading priority image: ${src}`);
    }
  }, [priority, src]);

  // Debug logging for image src changes
  useEffect(() => {
    console.log(`OptimizedImage: Loading image ${src} for ${alt}`);
    setIsLoaded(false);
    setError(false);
    setIsLoading(true);
  }, [src, alt]);

  const handleLoad = () => {
    console.log(`OptimizedImage: Successfully loaded ${src}`);
    setIsLoaded(true);
    setIsLoading(false);
    setError(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    console.error(`OptimizedImage: Failed to load image: ${src}`);
    setError(true);
    setIsLoading(false);
    setIsLoaded(false);
  };

  const aspectClass = AspectRatioClasses[aspectRatio];

  // If image failed to load, show a fallback
  if (error) {
    return (
      <div className={cn(
        aspectClass,
        "bg-gray-200 flex items-center justify-center text-gray-500 text-sm",
        className
      )}>
        <div className="text-center p-4">
          <div className="text-xs opacity-70">Image failed to load</div>
          <div className="text-xs opacity-50 mt-1">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      aspectClass,
      isLoading && !isLoaded && loadingClassName,
      "overflow-hidden relative",
      className
    )}>
      {/* Show loading state */}
      {isLoading && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-xs">Loading...</div>
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        style={style}
        className={cn(
          "w-full h-full transition-all duration-500",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
          !isLoaded ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
        )}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default OptimizedImage;

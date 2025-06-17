
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

  // For priority images, preload them
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
    }
  }, [priority, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  const aspectClass = AspectRatioClasses[aspectRatio];

  return (
    <div className={cn(
      aspectClass,
      !isLoaded && !error && loadingClassName,
      "overflow-hidden", // Add overflow hidden for cleaner edges
      className
    )}>
      <img
        src={src}
        alt={alt}
        style={style}
        className={cn(
          "w-full h-full transition-all duration-500", // Smoother transition
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
          !isLoaded && !error ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100" // Subtle zoom effect on load
        )}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default OptimizedImage;

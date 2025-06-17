
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
  const [errorDetails, setErrorDetails] = useState<string>("");

  // For priority images, preload them
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
      console.log(`Preloading priority image: ${src}`);
    }
  }, [priority, src]);

  // Debug logging for image src changes and file existence check
  useEffect(() => {
    console.log(`OptimizedImage: Loading image ${src} for ${alt}`);
    setIsLoaded(false);
    setError(false);
    setErrorDetails("");
    setIsLoading(true);

    // For local files, try to check if they exist
    if (src.startsWith('/lovable-uploads/')) {
      console.log(`OptimizedImage: Checking local file existence for ${src}`);
      fetch(src, { method: 'HEAD' })
        .then(response => {
          console.log(`OptimizedImage: HEAD request for ${src} returned status: ${response.status}`);
          if (!response.ok) {
            console.error(`OptimizedImage: Local file ${src} returned ${response.status} ${response.statusText}`);
          }
        })
        .catch(error => {
          console.error(`OptimizedImage: HEAD request failed for ${src}:`, error);
        });
    }
  }, [src, alt]);

  const handleLoad = () => {
    console.log(`OptimizedImage: Successfully loaded ${src}`);
    setIsLoaded(true);
    setIsLoading(false);
    setError(false);
    setErrorDetails("");
    if (onLoad) onLoad();
  };

  const handleError = (e: any) => {
    const errorMsg = e?.target?.error || e?.message || 'Unknown error';
    console.error(`OptimizedImage: Failed to load image: ${src}`, {
      error: errorMsg,
      naturalWidth: e?.target?.naturalWidth,
      naturalHeight: e?.target?.naturalHeight,
      complete: e?.target?.complete
    });
    setError(true);
    setIsLoading(false);
    setIsLoaded(false);
    setErrorDetails(errorMsg);
  };

  const aspectClass = AspectRatioClasses[aspectRatio];

  // If image failed to load, show a detailed fallback
  if (error) {
    return (
      <div className={cn(
        aspectClass,
        "bg-gray-200 flex items-center justify-center text-gray-500 text-sm border-2 border-dashed border-gray-300",
        className
      )}>
        <div className="text-center p-4 max-w-full">
          <div className="text-xs opacity-70 mb-1">Image failed to load</div>
          <div className="text-xs opacity-50 mb-2 truncate">{alt}</div>
          <div className="text-xs opacity-40 font-mono truncate">{src.split('/').pop()}</div>
          {errorDetails && (
            <div className="text-xs opacity-30 mt-1">Error: {errorDetails}</div>
          )}
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
          <div className="text-gray-400 text-xs">Loading {src.split('/').pop()}...</div>
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

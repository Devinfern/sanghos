
import { useState, useEffect, CSSProperties, useRef, SyntheticEvent } from "react";
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
  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset loading state when src changes
  useEffect(() => {
    console.log(`OptimizedImage: (Effect) Initiating load for ${src} (Alt: ${alt})`);
    setLoadingState('loading');
    // Clear any previous error state when src changes
    // This helps with re-attempts if an image previously failed
    if (imgRef.current) {
      imgRef.current.src = src; // Force re-render/re-load if src changes
    }
  }, [src, alt]);

  // Handle preloading for priority images
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => console.log(`Preloaded priority image success: ${src}`);
      img.onerror = (e) => console.error(`Preloaded priority image failed: ${src}`, e);
    }
  }, [priority, src]);

  const handleLoad = () => {
    // Only set to loaded if not already in an error state
    // This prevents a delayed load event from overriding a legitimate error
    if (loadingState !== 'error') {
      console.log(`OptimizedImage: (Event) Successfully loaded ${src}`);
      setLoadingState('loaded');
      if (onLoad) {
        onLoad();
      }
    }
  };

  // Corrected type for the event parameter
  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const errorMsg = 
        (e.nativeEvent instanceof ErrorEvent && e.nativeEvent.message) || // More specific for ErrorEvent
        (e.target instanceof HTMLImageElement && e.target.src) || // Fallback to src if other error info is missing
        'Unknown image loading error';

    console.error(`OptimizedImage: (Event) Failed to load image: ${src}`, {
      error: errorMsg,
      // Access naturalWidth/Height/complete from e.target, which is the HTMLImageElement
      naturalWidth: (e.target as HTMLImageElement).naturalWidth,
      naturalHeight: (e.target as HTMLImageElement).naturalHeight,
      complete: (e.target as HTMLImageElement).complete,
    });
    setLoadingState('error');
  };

  const aspectClass = AspectRatioClasses[aspectRatio];

  // If image failed to load, show a detailed fallback
  if (loadingState === 'error') {
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
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      aspectClass,
      "overflow-hidden relative",
      className
    )}>
      {/* Show loading state until image is actually loaded */}
      {loadingState === 'loading' && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          loadingClassName
        )}>
          <div className="text-gray-400 text-xs">
            Loading {src.split('/').pop()}...
          </div>
        </div>
      )}
      
      <img
        ref={imgRef} // Assign ref to the actual img element
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
          // Only show the image when it's loaded, otherwise keep it transparent
          loadingState === 'loaded' ? "opacity-100" : "opacity-0"
        )}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default OptimizedImage;

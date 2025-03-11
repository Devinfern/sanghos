import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loadingClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "custom";
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
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
  loadingClassName = "bg-muted",
  aspectRatio = "square",
  priority = false,
  objectFit = "cover",
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
  return;
};
export default OptimizedImage;
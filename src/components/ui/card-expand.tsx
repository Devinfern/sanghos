
import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { X, Plus } from "lucide-react"

interface CardExpandProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string
  title: string
  description?: string
  expandedContent?: React.ReactNode
  initialWidth?: number
  initialHeight?: number
  expandedWidth?: number
  expandedHeight?: number
  isExpanded: boolean
  onExpand: () => void
  onClose: () => void
  category?: string
  categoryIcon?: React.ReactNode
}

const CardExpand = React.forwardRef<HTMLDivElement, CardExpandProps>(
  ({
    image,
    title,
    description,
    expandedContent,
    initialWidth = 300,
    initialHeight = 388,
    expandedWidth = 500,
    expandedHeight = 600,
    isExpanded,
    onExpand,
    onClose,
    category,
    categoryIcon,
    className,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-xl shadow-lg",
          "bg-background border border-border",
          className
        )}
        initial={{
          width: initialWidth,
          height: initialHeight,
        }}
        animate={{
          width: isExpanded ? expandedWidth : initialWidth,
          height: isExpanded ? expandedHeight : initialHeight,
        }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
        onClick={!isExpanded ? onExpand : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: isExpanded ? 1 : 1.02 }}
        layout
        {...props}
      >
        {/* Background Image with Dark Gradient Overlay */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            opacity: isExpanded ? 0 : 1
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            style={{ height: '110%', transform: 'translateY(-5%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
        </motion.div>

        {/* Solid Background for Expanded State */}
        <motion.div
          className="absolute inset-0 bg-gray-900"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Animated Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            boxShadow: isHovered && !isExpanded
              ? "0 0 30px rgba(255, 255, 255, 0.3)"
              : "0 0 0px rgba(255, 255, 255, 0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
          {/* Top Section - Category Badge and Close Button */}
          <div className="flex items-start justify-between mb-6">
            {category && (
              <div className="inline-flex items-center gap-x-2.5 px-4 py-3 md:px-6 md:py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20">
                {categoryIcon && (
                  <div className="text-white w-5 h-5 flex items-center justify-center">
                    {categoryIcon}
                  </div>
                )}
                <span className="text-xs text-white font-sans leading-normal font-normal">
                  {category}
                </span>
              </div>
            )}
            
            {isExpanded && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            )}
          </div>

          {/* Bottom Section - Title and Content */}
          <div className="space-y-4 mt-auto">
            {/* Collapsed Content */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-sans leading-tight font-light max-w-[400px] mb-4">
                {title}
              </h3>
              {description && (
                <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
                  {description}
                </p>
              )}
              
              {/* Expand Button */}
              <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                <span className="text-sm font-medium mr-2">Learn More</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>

            {/* Expanded Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                y: isExpanded ? 0 : 20,
              }}
              transition={{ duration: 0.4, delay: isExpanded ? 0.2 : 0 }}
              className="absolute inset-6 flex flex-col justify-center"
            >
              {isExpanded && (
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-sans leading-tight">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-white/90 text-base md:text-lg leading-relaxed">
                      {description}
                    </p>
                  )}
                  {expandedContent}
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Glassmorphism overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )
  }
)

CardExpand.displayName = "CardExpand"

export { CardExpand }

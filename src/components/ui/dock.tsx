
import { AnimatePresence, motion } from "framer-motion";
import React, { Children, cloneElement, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

interface DockProps {
  children: React.ReactNode;
  className?: string;
}
interface DockItemProps {
  className?: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  tabIndex?: number;
}
interface DockLabelProps {
  className?: string;
  children: React.ReactNode;
}
interface DockIconProps {
  className?: string;
  children: React.ReactNode;
}

const DockContext = createContext<{ activeIndex: number; setActiveIndex?: (idx: number) => void }>({
  activeIndex: 0,
});

export function Dock({ children, className }: DockProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Children must be DockItems
  const items = React.Children.toArray(children);

  return (
    <DockContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div
        className={cn(
          "flex max-w-full items-end justify-center gap-4 bg-sage-50/90 backdrop-blur-lg border border-sage-200/30 rounded-2xl px-4 py-5 shadow-lg",
          className
        )}
        role="tablist"
        aria-label="Application dock"
      >
        {items.map((child, idx) => {
          if (React.isValidElement<DockItemProps>(child)) {
            return React.cloneElement(child, {
              key: idx,
              active: activeIndex === idx,
              tabIndex: 0,
              onClick: () => setActiveIndex(idx),
            });
          }
          return child;
        })}
      </div>
    </DockContext.Provider>
  );
}

export function DockItem({
  children,
  className,
  active = false,
  onClick,
  disabled,
  tabIndex,
}: DockItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex flex-col items-center justify-center rounded-full w-14 h-14 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70",
        active
          ? "bg-white ring-2 ring-brand-primary shadow-md border border-sage-200 scale-105"
          : disabled
          ? "bg-sage-100/60 cursor-not-allowed opacity-60"
          : "bg-white/80 hover:bg-white shadow hover:scale-105",
        className
      )}
      style={{
        transitionProperty: "transform, box-shadow, background",
      }}
      aria-selected={active}
      aria-disabled={disabled}
      tabIndex={tabIndex}
      onClick={!disabled ? onClick : undefined}
      role="tab"
    >
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass active prop for possible use in label/icon styling.
          return React.cloneElement(child, { active } as any);
        }
        return child;
      })}
      {/* Underline on active */}
      <AnimatePresence>
        {active && (
          <motion.div
            layoutId="dock-underline"
            className="mt-2 h-1 w-7 rounded-full bg-brand-primary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}

export function DockLabel({
  children,
  className,
  active,
}: DockLabelProps & { active?: boolean }) {
  return (
    <span
      className={cn(
        "mb-1.5 text-sage-700 text-xs md:text-sm font-medium transition-colors",
        active ? "text-brand-primary" : "group-hover:text-brand-primary"
      )}
    >
      {children}
    </span>
  );
}

export function DockIcon({
  children,
  className,
  active,
}: DockIconProps & { active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center transition-all",
        active ? "scale-105 text-brand-primary" : ""
      )}
    >
      {children}
    </div>
  );
}

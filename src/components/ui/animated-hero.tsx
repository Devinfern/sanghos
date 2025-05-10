import React from "react";
import { motion } from "framer-motion";
export const AnimatedHero = () => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.8,
    delay: 0.3
  }}>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight relative">
        <motion.span initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.4
      }} className="block">Find Your Next</motion.span>
        <span className="relative inline-block">
          <motion.span initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.6
        }} className="bg-gradient-to-r from-brand-peach via-white to-brand-subtle bg-clip-text text-brand-primary">
            Wellness Retreat
          </motion.span>
          <motion.span initial={{
          scaleX: 0
        }} animate={{
          scaleX: 1
        }} transition={{
          duration: 0.7,
          delay: 0.9,
          ease: "easeOut"
        }} className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-brand-peach to-brand-subtle rounded-full origin-left" />
        </span>
      </h1>
    </motion.div>;
};
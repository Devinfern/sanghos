import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pen, Image, Smile, X } from "lucide-react";
import CreatePost from "../CreatePost";

interface FloatingCreateButtonProps {
  onPostCreated: () => void;
}

const FloatingCreateButton = ({ onPostCreated }: FloatingCreateButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const quickOptions = [
    { icon: Pen, label: "Write Post", color: "bg-brand-primary" },
    { icon: Image, label: "Share Photo", color: "bg-brand-sand" },
    { icon: Smile, label: "Share Feeling", color: "bg-brand-rose" },
  ];

  const handlePostCreated = () => {
    setIsOpen(false);
    setShowOptions(false);
    onPostCreated();
  };

  return (
    <>
      {/* Desktop FAB */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <div className="relative">
          {/* Quick Options */}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 space-y-3"
              >
                {quickOptions.map((option, index) => (
                  <motion.div
                    key={option.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => setIsOpen(true)}
                      className={`${option.color} hover:${option.color}/90 text-white rounded-full h-12 px-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setShowOptions(!showOptions)}
              className="w-14 h-14 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: showOptions ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-6 h-6" />
              </motion.div>
              
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: showOptions ? 1.5 : 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pen className="w-5 h-5 text-brand-primary" />
              Create New Post
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <CreatePost onPostCreated={handlePostCreated} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingCreateButton;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SavedCostsCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setProgressWidth(32);
    }, 800);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-r from-cloud-blue to-cloud-teal p-6 rounded-xl text-white shadow-lg"
    >
      <div className="absolute inset-0 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 800 800"
        >
          <motion.circle 
            cx="400" 
            cy="400" 
            r="200" 
            stroke="white" 
            strokeWidth="100" 
            strokeLinecap="round" 
            strokeDasharray="1 50" 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="400" 
            cy="400" 
            r="300" 
            stroke="white" 
            strokeWidth="50" 
            strokeLinecap="round" 
            strokeDasharray="1 30"
            animate={{ rotate: -360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="400" 
            cy="400" 
            r="380" 
            stroke="white" 
            strokeWidth="20" 
            strokeLinecap="round" 
            strokeDasharray="1 20"
            animate={{ rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.h3 
              className="text-lg font-semibold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Total Cost Savings
            </motion.h3>
            <motion.div 
              className="flex items-baseline space-x-1 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="text-3xl font-bold">$128,456</span>
              <span className="text-sm opacity-80">YTD</span>
            </motion.div>
            <motion.div 
              className="bg-white/20 rounded-lg p-3 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-80">Guaranteed 30% Savings</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div 
                  className="bg-white h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressWidth}%` }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SavedCostsCard;

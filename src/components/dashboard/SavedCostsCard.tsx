
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SavedCostsCard: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setProgressWidth(32);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ 
        y: -8,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
      }}
      className="relative overflow-hidden bg-gradient-to-r from-cloud-blue to-cloud-teal p-6 rounded-xl text-white shadow-lg h-full"
    >
      <div className="absolute inset-0 opacity-10">
        <motion.svg
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
            animate={{ 
              rotate: 360,
              scale: hover ? 1.1 : 1
            }}
            transition={{ 
              rotate: { duration: 120, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.8, ease: "easeOut" }
            }}
          />
          <motion.circle 
            cx="400" 
            cy="400" 
            r="300" 
            stroke="white" 
            strokeWidth="50" 
            strokeLinecap="round" 
            strokeDasharray="1 30"
            animate={{ 
              rotate: -360,
              scale: hover ? 1.05 : 1
            }}
            transition={{ 
              rotate: { duration: 180, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.8, ease: "easeOut" }
            }}
          />
          <motion.circle 
            cx="400" 
            cy="400" 
            r="380" 
            stroke="white" 
            strokeWidth="20" 
            strokeLinecap="round" 
            strokeDasharray="1 20"
            animate={{ 
              rotate: 360,
              scale: hover ? 1.05 : 1
            }}
            transition={{ 
              rotate: { duration: 240, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.8, ease: "easeOut" }
            }}
          />
        </motion.svg>
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
              <motion.span 
                className="text-3xl font-bold"
                animate={{ scale: hover ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                $128,456
              </motion.span>
              <span className="text-sm opacity-80">YTD</span>
            </motion.div>
            <motion.div 
              className="bg-white/20 rounded-lg p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm opacity-80">Guaranteed 30% Savings</span>
                <motion.span 
                  className="text-sm font-medium"
                  animate={{ 
                    x: hover ? [0, 5, 0] : 0
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: hover ? 1 : 0 
                  }}
                >
                  32%
                </motion.span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-white h-3 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: `${progressWidth}%`,
                    boxShadow: hover ? "0 0 20px 5px rgba(255,255,255,0.5)" : "none"
                  }}
                  transition={{ 
                    width: { delay: 0.8, duration: 1.5, ease: "easeOut" },
                    boxShadow: { duration: 0.3 }
                  }}
                ></motion.div>
              </div>
            </motion.div>
            
            {/* Added feature - cost saving tips */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: hover ? 1 : 0,
                height: hover ? 'auto' : 0
              }}
              transition={{ duration: 0.5 }}
              className="mt-4 overflow-hidden"
            >
              <span className="text-xs font-medium">💡 Optimization Tips</span>
              <ul className="text-xs mt-2 space-y-1">
                <motion.li 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center"
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Right-size underutilized instances
                </motion.li>
                <motion.li 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center"
                >
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Implement automated shutdown schedules
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SavedCostsCard;

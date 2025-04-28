
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    positive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-blue-500",
  bgColor = "bg-blue-50",
}) => {
  return (
    <motion.div 
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-sm font-medium text-gray-500"
          >
            {title}
          </motion.p>
          <motion.h3 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
          >
            {value}
          </motion.h3>
          {change && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center mt-2"
            >
              <span
                className={cn(
                  "text-xs font-medium flex items-center",
                  change.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.positive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {change.value}
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </motion.div>
          )}
        </div>
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 15 }}
          className={cn("p-3 rounded-lg", bgColor)}
          style={{ 
            background: `linear-gradient(135deg, ${bgColor.replace('bg-', '')} 0%, rgba(255,255,255,0.8) 100%)`,
            boxShadow: `0 8px 16px -4px ${bgColor.replace('bg-', 'rgba(0,0,0,0.1)')}` 
          }}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </motion.div>
      </div>
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        className="h-1 w-full bg-gradient-to-r from-gray-100 to-transparent rounded-full mt-4"
      />
    </motion.div>
  );
};

export default StatCard;

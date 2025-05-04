
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { itemVariants } from "./Hero";

const LandingHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      variants={itemVariants}
      className="flex justify-between items-center mb-16"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
          <span className="text-white font-bold text-xl">SS</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-cloud-blue to-cloud-teal bg-clip-text text-transparent">
          skyspearsolutions.io
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/login')}
          className="text-gray-700 hover:text-cloud-blue"
        >
          Login
        </Button>
        <Button 
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-cloud-blue to-cloud-teal text-white hover:opacity-90 transition-all"
        >
          Get Started
        </Button>
      </div>
    </motion.div>
  );
};

export default LandingHeader;


import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { itemVariants } from "./Hero";

interface LandingHeaderProps {
  tenantId?: string | null;
  isCustomDomain?: boolean;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ tenantId, isCustomDomain }) => {
  const navigate = useNavigate();
  
  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { 
      scale: 1.05,
      rotate: [0, 1, 0],
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };
  
  return (
    <motion.div 
      variants={itemVariants}
      className="flex justify-between items-center mb-16"
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center gap-3"
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
          <span className="text-white font-bold text-xl">SS</span>
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-cloud-blue to-cloud-teal bg-clip-text text-transparent">
          skyspearsolutions.io
        </span>
        
        {tenantId && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  className="ml-2 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-cloud-blue/20 to-cloud-teal/20 text-gray-700 font-semibold"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {isCustomDomain ? "Custom Domain" : tenantId}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                {isCustomDomain 
                  ? `You're accessing via a custom domain for ${tenantId}`
                  : `You're viewing as ${tenantId}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </motion.div>
      
      <motion.div 
        className="flex gap-4 items-center"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="text-gray-700 hover:text-cloud-blue"
          >
            Login
          </Button>
        </motion.div>
        
        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <Button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-cloud-blue to-cloud-teal text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingHeader;

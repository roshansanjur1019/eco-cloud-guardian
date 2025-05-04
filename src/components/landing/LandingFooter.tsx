
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./Hero";

const LandingFooter: React.FC = () => {
  const tenantId = sessionStorage.getItem('tenantId');
  const customDomain = sessionStorage.getItem('customDomain');
  
  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -3, transition: { duration: 0.2 } }
  };
  
  return (
    <motion.footer
      variants={fadeIn}
      className="mt-24 pt-8 border-t border-gray-100"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div 
          className="flex items-center gap-3 mb-4 md:mb-0"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <span className="text-lg font-semibold">
            {customDomain || "skyspearsolutions.io"}
            {tenantId && !customDomain && (
              <span className="text-xs ml-2 text-gray-500">[{tenantId}]</span>
            )}
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-x-8 gap-y-2 justify-center text-sm text-gray-600"
        >
          <motion.a 
            href="#" 
            className="hover:text-cloud-blue"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            Privacy Policy
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-cloud-blue"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            Terms of Service
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-cloud-blue"
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
          >
            Contact Us
          </motion.a>
          {tenantId && (
            <motion.span 
              className="text-cloud-teal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Enterprise Portal
            </motion.span>
          )}
        </motion.div>
        
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} SkySpear Solutions. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default LandingFooter;


import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./Hero";

const LandingFooter: React.FC = () => {
  return (
    <motion.footer
      variants={fadeIn}
      className="mt-24 pt-8 border-t border-gray-100"
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">SS</span>
          </div>
          <span className="text-lg font-semibold">skyspearsolutions.io</span>
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} SkySpear Solutions. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default LandingFooter;

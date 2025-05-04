
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./Hero";

const DashboardPreview: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-24"
      id="dashboard-preview"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Unified Dashboard Experience</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get a complete view of your cloud infrastructure across providers in one intuitive interface.
        </p>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cloud-blue/10 via-cloud-teal/5 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80" 
          alt="Dashboard Preview"
          className="w-full h-auto object-cover min-h-[400px]"
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            console.error("Image failed to load");
            e.currentTarget.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
            e.currentTarget.style.minHeight = "400px";
          }}
        />
        
        {/* Overlay elements to make it look like a dashboard */}
        <div className="absolute inset-0 z-20 p-6 flex flex-col pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-full max-w-xs mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Monthly Cost Overview</h4>
            <div className="h-20 bg-gradient-to-r from-cloud-blue/20 to-cloud-teal/20 rounded-md"></div>
          </div>
          
          <div className="mt-auto flex flex-wrap gap-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-full sm:w-1/4">
              <h4 className="text-xs font-semibold text-gray-700">AWS Resources</h4>
              <p className="text-lg font-bold text-cloud-blue">245</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-full sm:w-1/4">
              <h4 className="text-xs font-semibold text-gray-700">Azure Resources</h4>
              <p className="text-lg font-bold text-cloud-purple">187</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-full sm:w-1/4">
              <h4 className="text-xs font-semibold text-gray-700">GCP Resources</h4>
              <p className="text-lg font-bold text-cloud-teal">113</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardPreview;

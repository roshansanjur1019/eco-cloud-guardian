
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate page loading
    setPageLoaded(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AnimatePresence mode="wait">
        <motion.div
          key="sidebar"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className="flex-1 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
      >
        <Header />
        <AnimatePresence mode="wait">
          {pageLoaded && (
            <motion.main 
              key="main-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 p-6 overflow-y-auto"
            >
              {children}
            </motion.main>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;

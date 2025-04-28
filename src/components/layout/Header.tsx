
import React, { useState } from "react";
import { Bell, Search, Plus, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifDropdown, setNotifDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleNotifDropdown = () => setNotifDropdown(!notifDropdown);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-30"
    >
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex-1"
        >
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back to your cloud governance center</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center space-x-4"
        >
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(14, 165, 233, 0.2)" }}
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cloud-blue/20 w-64 transition-all"
            />
          </div>
          
          <Link to="/add-account">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2 hover:bg-cloud-blue/10 hover:text-cloud-blue hover:border-cloud-blue/30 transition-all">
                <Plus size={16} />
                <span>Add Account</span>
              </Button>
            </motion.div>
          </Link>
          
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleNotifDropdown}
              className="cursor-pointer"
            >
              <Bell size={20} className="text-gray-600 hover:text-gray-800 transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                3
              </span>
            </motion.div>
            
            <AnimatePresence>
              {notifDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
                >
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">Notifications</h5>
                      <span className="text-xs text-cloud-blue">Mark all as read</span>
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></div>
                        <div>
                          <p className="text-sm">AWS account cost spike detected</p>
                          <p className="text-xs text-gray-500">10 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500"></div>
                        <div>
                          <p className="text-sm">New governance policy recommendation</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <div className="flex gap-3">
                        <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500"></div>
                        <div>
                          <p className="text-sm">5 resources optimized successfully</p>
                          <p className="text-xs text-gray-500">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <button className="w-full text-center text-xs text-cloud-blue py-1 hover:bg-cloud-blue/5 rounded">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDropdown}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cloud-blue to-cloud-teal text-white flex items-center justify-center font-medium">
                JS
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </motion.div>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50"
                >
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium">John Smith</p>
                    <p className="text-xs text-gray-500">john@company.com</p>
                  </div>
                  <div className="p-1">
                    <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 rounded">
                      <User size={16} className="text-gray-500" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 rounded">
                      <Settings size={16} className="text-gray-500" />
                      <span>Settings</span>
                    </button>
                  </div>
                  <div className="p-1 border-t border-gray-100">
                    <button className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 text-red-500 rounded">
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;

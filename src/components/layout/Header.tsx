
import React from "react";
import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back to your cloud governance center</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cloud-blue/20 w-64"
            />
          </div>
          
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
            <Plus size={16} />
            <span>Add Account</span>
          </Button>
          
          <div className="relative">
            <Bell size={20} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

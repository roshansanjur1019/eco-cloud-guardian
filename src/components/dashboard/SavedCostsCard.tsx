
import React from "react";

const SavedCostsCard: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-cloud-blue to-cloud-teal p-6 rounded-xl text-white">
      <div className="absolute inset-0 opacity-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="400" r="200" stroke="white" strokeWidth="100" strokeLinecap="round" strokeDasharray="1 50" />
          <circle cx="400" cy="400" r="300" stroke="white" strokeWidth="50" strokeLinecap="round" strokeDasharray="1 30" />
          <circle cx="400" cy="400" r="380" stroke="white" strokeWidth="20" strokeLinecap="round" strokeDasharray="1 20" />
        </svg>
      </div>
      <div className="relative">
        <h3 className="text-lg font-semibold mb-2">Total Cost Savings</h3>
        <div className="flex items-baseline space-x-1 mb-4">
          <span className="text-3xl font-bold">$128,456</span>
          <span className="text-sm opacity-80">YTD</span>
        </div>
        <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-80">Guaranteed 30% Savings</span>
            <span className="text-sm font-medium">32%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: "32%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCostsCard;

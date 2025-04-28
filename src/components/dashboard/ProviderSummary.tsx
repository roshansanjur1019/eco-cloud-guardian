
import React from "react";

const providerData = [
  { 
    name: "AWS", 
    color: "bg-cloud-blue",
    accounts: 12, 
    regions: 6,
    services: 47,
    resourceCount: 267,
    monthlyCost: 18240,
  },
  { 
    name: "Azure", 
    color: "bg-cloud-teal",
    accounts: 5, 
    regions: 4,
    services: 28,
    resourceCount: 142,
    monthlyCost: 10430,
  },
  { 
    name: "GCP", 
    color: "bg-cloud-purple",
    accounts: 3, 
    regions: 3,
    services: 18,
    resourceCount: 93,
    monthlyCost: 6725,
  },
];

const ProviderSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Cloud Provider Summary</h3>
      </div>
      
      <div className="grid grid-cols-1 divide-y divide-gray-100">
        {providerData.map((provider) => (
          <div key={provider.name} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-4 h-4 rounded-full ${provider.color}`}></div>
              <h4 className="font-medium text-gray-800">{provider.name}</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <p className="text-xs text-gray-500">Accounts</p>
                <p className="font-medium">{provider.accounts}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Regions</p>
                <p className="font-medium">{provider.regions}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Services</p>
                <p className="font-medium">{provider.services}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Resources</p>
                <p className="font-medium">{provider.resourceCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Cost</p>
                <p className="font-medium">${provider.monthlyCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderSummary;

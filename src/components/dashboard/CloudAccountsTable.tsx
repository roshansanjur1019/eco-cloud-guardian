
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const accounts = [
  {
    id: 1,
    name: "Production AWS",
    provider: "AWS",
    status: "Connected",
    lastSync: "2 hours ago",
    monthlyCost: 12480,
    savings: 4356,
  },
  {
    id: 2,
    name: "Development Azure",
    provider: "Azure",
    status: "Connected",
    lastSync: "1 hour ago",
    monthlyCost: 8250,
    savings: 2722,
  },
  {
    id: 3,
    name: "Analytics GCP",
    provider: "GCP",
    status: "Error",
    lastSync: "Failed",
    monthlyCost: 5640,
    savings: 1880,
  },
  {
    id: 4,
    name: "Staging AWS",
    provider: "AWS",
    status: "Connected",
    lastSync: "3 hours ago",
    monthlyCost: 3200,
    savings: 960,
  },
];

const CloudAccountsTable: React.FC = () => {
  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "AWS":
        return "bg-cloud-blue text-cloud-blue";
      case "Azure":
        return "bg-cloud-teal text-cloud-teal";
      case "GCP":
        return "bg-cloud-purple text-cloud-purple";
      default:
        return "bg-cloud-slate text-cloud-slate";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Cloud Accounts</h3>
            <p className="text-sm text-gray-500">Monitor your connected cloud accounts</p>
          </div>
          <Button variant="outline" size="sm">
            Add Account
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="py-3 px-6 text-left font-medium">Account</th>
              <th className="py-3 px-6 text-left font-medium">Provider</th>
              <th className="py-3 px-6 text-left font-medium">Status</th>
              <th className="py-3 px-6 text-left font-medium">Last Sync</th>
              <th className="py-3 px-6 text-left font-medium">Monthly Cost</th>
              <th className="py-3 px-6 text-left font-medium">Monthly Savings</th>
              <th className="py-3 px-6 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {accounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-800">{account.name}</div>
                </td>
                <td className="py-4 px-6">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-10 ${getProviderColor(account.provider)}`}>
                    {account.provider}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {account.status === "Connected" ? (
                    <div className="flex items-center text-green-600">
                      <Check size={16} className="mr-1" />
                      <span>{account.status}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <X size={16} className="mr-1" />
                      <span>{account.status}</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {account.lastSync}
                </td>
                <td className="py-4 px-6 font-medium text-gray-800">
                  ${account.monthlyCost.toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <div className="text-green-600 font-medium">
                    ${account.savings.toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CloudAccountsTable;


import React from 'react';
import Layout from '@/components/layout/Layout';

const CloudAccounts: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cloud Accounts</h1>
          <p className="text-gray-500">Connect and manage your cloud provider accounts</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-40 w-40 bg-cloud-blue/10 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-3">Connect Your Cloud Accounts</h2>
            <p className="text-gray-500 mb-6">Link your AWS, Azure, and GCP accounts to gain insights and start saving at least 30% on your cloud costs.</p>
            <button className="bg-cloud-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-cloud-dark-blue transition-colors">
              Connect New Account
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CloudAccounts;

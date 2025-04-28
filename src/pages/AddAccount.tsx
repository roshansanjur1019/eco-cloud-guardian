
import React from 'react';
import Layout from '@/components/layout/Layout';
import { CloudAccountForm } from '@/components/cloud/CloudAccountForm';

const AddAccount: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Cloud Account</h1>
          <p className="text-gray-500">Connect a new cloud provider account to start monitoring and optimizing costs</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <CloudAccountForm />
        </div>
      </div>
    </Layout>
  );
};

export default AddAccount;

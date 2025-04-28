
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CloudAccountsTable from '@/components/dashboard/CloudAccountsTable';

const CloudAccounts: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cloud Accounts</h1>
            <p className="text-gray-500">Connect and manage your cloud provider accounts</p>
          </div>
          <Link to="/add-account">
            <Button>
              Connect New Account
            </Button>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <CloudAccountsTable />
        </div>
      </div>
    </Layout>
  );
};

export default CloudAccounts;

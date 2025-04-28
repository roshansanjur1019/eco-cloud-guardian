
import React from 'react';
import Layout from '@/components/layout/Layout';
import { CloudAccountForm } from '@/components/cloud/CloudAccountForm';
import { motion } from "framer-motion";

const AddAccount: React.FC = () => {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add Cloud Account</h1>
          <p className="text-gray-500">Connect a new cloud provider account to start monitoring and optimizing costs</p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-white p-8 rounded-xl shadow-md border border-gray-100 backdrop-blur-sm bg-opacity-95"
        >
          <CloudAccountForm />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AddAccount;

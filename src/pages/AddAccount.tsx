
import React from 'react';
import Layout from '@/components/layout/Layout';
import { CloudAccountForm } from '@/components/cloud/CloudAccountForm';
import { motion } from "framer-motion";

const AddAccount: React.FC = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden min-h-[80vh]">
        {/* Background decorative elements */}
        <motion.div 
          className="absolute top-20 -right-20 w-80 h-80 bg-cloud-blue/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.5, 0.3],
            rotate: 360 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-cloud-teal/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.5, 0.3],
            rotate: -360 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8 relative z-10"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cloud-blue to-cloud-teal"
            >
              Add Cloud Account
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-500 mt-2"
            >
              Connect a new cloud provider account to start monitoring and optimizing costs
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 backdrop-blur-sm bg-opacity-95"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <CloudAccountForm />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AddAccount;

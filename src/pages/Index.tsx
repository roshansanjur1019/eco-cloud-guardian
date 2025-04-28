
import React from "react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import CostChart from "@/components/dashboard/CostChart";
import SavedCostsCard from "@/components/dashboard/SavedCostsCard";
import CloudAccountsTable from "@/components/dashboard/CloudAccountsTable";
import ProviderSummary from "@/components/dashboard/ProviderSummary";
import { Cloud, CloudCog, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Index: React.FC = () => {
  return (
    <Layout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Dashboard Stats */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <StatCard 
            title="Total Cloud Accounts" 
            value="20" 
            change={{ value: "3", positive: true }}
            icon={Cloud}
            iconColor="text-cloud-blue"
            bgColor="bg-cloud-blue/10"
          />
          <StatCard 
            title="Active Resources" 
            value="502" 
            change={{ value: "12", positive: true }}
            icon={CloudCog}
            iconColor="text-cloud-teal"
            bgColor="bg-cloud-teal/10"
          />
          <StatCard 
            title="Governance Policies" 
            value="48" 
            change={{ value: "5", positive: true }}
            icon={ShieldCheck}
            iconColor="text-cloud-purple"
            bgColor="bg-cloud-purple/10"
          />
          <StatCard 
            title="Team Members" 
            value="12" 
            change={{ value: "2", positive: true }}
            icon={Users}
            iconColor="text-cloud-indigo"
            bgColor="bg-cloud-indigo/10"
          />
        </motion.div>
        
        {/* Cost Trends and Savings */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-4 gap-5"
        >
          <motion.div 
            className="lg:col-span-3"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CostChart />
          </motion.div>
          <motion.div 
            className="lg:col-span-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SavedCostsCard />
          </motion.div>
        </motion.div>

        {/* Cloud Accounts Table */}
        <motion.div variants={itemVariants}>
          <CloudAccountsTable />
        </motion.div>

        {/* Provider Summary */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
        >
          <ProviderSummary />
        </motion.div>
      </motion.div>
      
      <Toaster />
    </Layout>
  );
};

export default Index;

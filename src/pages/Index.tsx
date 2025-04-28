
import React from "react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import CostChart from "@/components/dashboard/CostChart";
import SavedCostsCard from "@/components/dashboard/SavedCostsCard";
import CloudAccountsTable from "@/components/dashboard/CloudAccountsTable";
import ProviderSummary from "@/components/dashboard/ProviderSummary";
import { Cloud, CloudCog, ShieldCheck, Users } from "lucide-react";

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
        </div>
        
        {/* Cost Trends and Savings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="lg:col-span-3">
            <CostChart />
          </div>
          <div className="lg:col-span-1">
            <SavedCostsCard />
          </div>
        </div>

        {/* Cloud Accounts Table */}
        <div>
          <CloudAccountsTable />
        </div>

        {/* Provider Summary */}
        <div>
          <ProviderSummary />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

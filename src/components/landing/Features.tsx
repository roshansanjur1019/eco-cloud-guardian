
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Shield, CloudCog, Zap } from "lucide-react";
import { containerVariants, itemVariants } from "./Hero";

const features = [
  {
    icon: BarChart3,
    title: "Cost Optimization Engine",
    description: "Automatically identify cost-saving opportunities across your cloud environments with AI-powered recommendations.",
    color: "bg-cloud-blue/10",
    iconColor: "text-cloud-blue",
  },
  {
    icon: Shield,
    title: "Security Compliance Scanner",
    description: "Proactively detect vulnerabilities and ensure compliance with industry standards like SOC2, HIPAA, and PCI-DSS.",
    color: "bg-cloud-purple/10",
    iconColor: "text-cloud-purple",
  },
  {
    icon: CloudCog,
    title: "Disaster Recovery Orchestrator",
    description: "Design and automate cross-cloud recovery strategies with automated testing and monitoring.",
    color: "bg-cloud-teal/10",
    iconColor: "text-cloud-teal",
  },
  {
    icon: Zap,
    title: "Multi-Cloud Dashboard",
    description: "Gain unified visibility across AWS, Azure and GCP with a single management interface.",
    color: "bg-cloud-indigo/10",
    iconColor: "text-cloud-indigo",
  },
];

const Features: React.FC = () => {
  return (
    <motion.div 
      id="features"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-24"
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Comprehensive Cloud Governance</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our platform provides all the tools you need to manage your multi-cloud environment effectively.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="hover-lift"
          >
            <Card className="border border-gray-100 h-full">
              <CardContent className="pt-6">
                <div className={`p-3 rounded-lg ${feature.color} w-fit mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features;

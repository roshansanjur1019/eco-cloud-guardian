
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Cloud, CloudCog, BarChart3, Zap } from "lucide-react";
import { AnimatedBackground, FloatingElements } from "@/components/ui/animated-background";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

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

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AnimatedBackground className="min-h-screen flex flex-col">
      <FloatingElements />
      
      {/* Hero Section */}
      <motion.div 
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo and Navigation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
              <span className="text-white font-bold text-xl">SS</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cloud-blue to-cloud-teal bg-clip-text text-transparent">
              skyspearsolutions.io
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-gray-700 hover:text-cloud-blue"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-cloud-blue to-cloud-teal text-white hover:opacity-90 transition-all"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
        
        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-cloud-blue to-cloud-teal bg-clip-text text-transparent">
                Unified Cloud Governance
              </span>{" "}
              <br />for Modern Enterprises
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Optimize costs, ensure security compliance, and streamline operations across AWS, Azure, and GCP with our comprehensive platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate('/login')} 
                size="lg"
                className="bg-gradient-to-r from-cloud-blue to-cloud-teal text-white hover:opacity-90 transition-all px-8"
              >
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  const demoSection = document.getElementById('features');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border-cloud-blue text-cloud-blue hover:bg-cloud-blue/10"
              >
                See Features
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="relative hidden lg:block"
          >
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 bg-cloud-blue/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-10 -left-10 w-48 h-48 bg-cloud-teal/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 10,
                delay: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative z-10"
            >
              <img 
                src="/placeholder.svg" 
                alt="Dashboard Preview" 
                className="rounded-xl shadow-2xl border border-white/10 bg-white/50 backdrop-blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cloud-blue/10 to-transparent rounded-xl" />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Feature Cards */}
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
        
        {/* Dashboard Preview Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unified Dashboard Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a complete view of your cloud infrastructure across providers in one intuitive interface.
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cloud-blue/10 via-cloud-teal/5 to-transparent" />
            <img 
              src="/placeholder.svg" 
              alt="Dashboard Preview"
              className="w-full object-cover"
            />
          </motion.div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-2xl bg-gradient-to-r from-cloud-blue to-cloud-teal p-8 md:p-12 text-white text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
            Ready to optimize your cloud infrastructure?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Start your free 14-day trial today and discover how SkySpear Solutions can transform your cloud management.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button 
              onClick={() => navigate('/login')} 
              size="lg" 
              variant="outline"
              className="bg-white text-cloud-dark-blue hover:bg-white/90 border-0 px-8"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Footer */}
        <motion.footer
          variants={fadeIn}
          className="mt-24 pt-8 border-t border-gray-100"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-cloud-teal to-cloud-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-lg font-semibold">skyspearsolutions.io</span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} SkySpear Solutions. All rights reserved.
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </AnimatedBackground>
  );
};

export default LandingPage;

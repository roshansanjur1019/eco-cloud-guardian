
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default Hero;

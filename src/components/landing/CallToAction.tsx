
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { containerVariants, itemVariants } from "./Hero";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="rounded-2xl bg-gradient-to-r from-cloud-blue to-cloud-teal p-8 md:p-12 text-white text-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 right-10 h-40 w-40 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 h-60 w-60 rounded-full bg-white/5"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>
      
      <div className="relative z-10">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6">
          Ready to optimize your cloud infrastructure?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Start your free 14-day trial today and discover how SkySpear Solutions can transform your cloud management.
        </motion.p>
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            onClick={() => navigate('/login')} 
            size="lg" 
            variant="outline"
            className="bg-white text-cloud-dark-blue hover:bg-white/90 border-0 px-8 shadow-lg transform transition-all duration-300"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CallToAction;

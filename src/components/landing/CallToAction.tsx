
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
  );
};

export default CallToAction;

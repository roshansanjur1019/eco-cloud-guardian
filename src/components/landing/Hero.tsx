
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

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    y: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
      <motion.div variants={itemVariants}>
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span 
            className="bg-gradient-to-r from-cloud-blue to-cloud-teal bg-clip-text text-transparent inline-block"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            Unified Cloud Governance
          </motion.span>{" "}
          <br />for Modern Enterprises
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 mb-8 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Optimize costs, ensure security compliance, and streamline operations across AWS, Azure, and GCP with our comprehensive platform.
        </motion.p>
        <motion.div 
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button 
            onClick={() => navigate('/login')} 
            size="lg"
            className="bg-gradient-to-r from-cloud-blue to-cloud-teal text-white hover:opacity-90 transition-all px-8 hover:shadow-lg transform hover:-translate-y-1"
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
            className="border-cloud-blue text-cloud-blue hover:bg-cloud-blue/10 transform hover:-translate-y-1 transition-transform"
          >
            See Features
          </Button>
        </motion.div>
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
          animate={floatingAnimation}
          className="relative z-10"
        >
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
            alt="Dashboard Preview" 
            className="rounded-xl shadow-2xl border border-white/10 bg-white/50 backdrop-blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-cloud-blue/10 to-transparent rounded-xl" />
          
          {/* Floating elements */}
          <motion.div
            className="absolute -top-5 -right-5 bg-white p-3 rounded-lg shadow-lg flex items-center gap-2"
            animate={{
              y: [-5, 5],
              rotate: [-2, 2],
              transition: {
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }
            }}
          >
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <span className="text-xs font-semibold text-gray-700">All systems operational</span>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -left-4 bg-white p-2 rounded-lg shadow-lg text-xs font-medium text-gray-700"
            animate={{
              y: [3, -3],
              x: [2, -2],
              transition: {
                y: {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                },
                x: {
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }
            }}
          >
            <span className="flex items-center gap-1">
              <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
              Cost optimization active
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

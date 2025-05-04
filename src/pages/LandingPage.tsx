import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { containerVariants } from "@/components/landing/Hero";
import LandingHeader from "@/components/landing/LandingHeader";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardPreview from "@/components/landing/DashboardPreview";
import CallToAction from "@/components/landing/CallToAction";
import LandingFooter from "@/components/landing/LandingFooter";
import { useToast } from "@/components/ui/use-toast";

// Custom floating elements component since we're having type issues with the imported one
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-cloud-blue/10 to-cloud-teal/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [
              Math.random() * 0.3 + 0.5,
              Math.random() * 0.5 + 0.7,
              Math.random() * 0.3 + 0.5,
            ],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            opacity: Math.random() * 0.2 + 0.1,
          }}
        />
      ))}
    </div>
  );
};

const LandingPage: React.FC = () => {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for tenant ID in the URL (e.g., ?tenantId=acme-corp)
    const queryParams = new URLSearchParams(location.search);
    const tenant = queryParams.get('tenantId');
    
    if (tenant) {
      setTenantId(tenant);
      // Store tenant ID in session/local storage for use after login
      sessionStorage.setItem('tenantId', tenant);
      toast({
        title: "Organization Detected",
        description: `Welcome to ${tenant}'s portal`,
      });
    }
    
    // Check if accessing from custom domain
    const hostname = window.location.hostname;
    if (hostname !== 'skyspearsolutions.io' && 
        hostname !== 'localhost' && 
        !hostname.includes('lovable.app')) {
      setIsCustomDomain(true);
      // Extract organization name from hostname
      const orgName = hostname.split('.')[0];
      setTenantId(orgName);
      sessionStorage.setItem('tenantId', orgName);
      sessionStorage.setItem('customDomain', hostname);
    }
  }, [location.search, toast]);
  
  // Scroll animation for sections
  const scrollReveal = {
    hidden: { opacity: 0, y: 75 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };
  
  return (
    <AnimatedBackground className="min-h-screen flex flex-col overflow-hidden">
      <FloatingElements />
      
      {/* Cursor follower effect */}
      <CursorFollower />
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <LandingHeader tenantId={tenantId} isCustomDomain={isCustomDomain} />
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={scrollReveal}
        >
          <Hero />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={scrollReveal}
        >
          <Features />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={scrollReveal}
        >
          <DashboardPreview />
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={scrollReveal}
        >
          <CallToAction />
        </motion.div>
        
        <LandingFooter />
      </motion.div>
    </AnimatedBackground>
  );
};

// Custom cursor follower component for enhanced animations
const CursorFollower: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);
  
  return (
    <motion.div
      className="fixed w-40 h-40 rounded-full pointer-events-none z-10 mix-blend-difference"
      animate={{
        x: mousePosition.x - 80,
        y: mousePosition.y - 80,
        opacity: isVisible ? 0.07 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{
        type: "spring",
        mass: 0.3,
        stiffness: 80,
        damping: 15
      }}
      style={{
        background: 'radial-gradient(circle, rgba(78,192,240,1) 0%, rgba(20,184,166,0.5) 100%)',
      }}
    />
  );
};

export default LandingPage;

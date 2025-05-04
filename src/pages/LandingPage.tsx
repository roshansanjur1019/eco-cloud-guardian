
import React from "react";
import { motion } from "framer-motion";
import { AnimatedBackground, FloatingElements } from "@/components/ui/animated-background";
import { containerVariants } from "@/components/landing/Hero";
import LandingHeader from "@/components/landing/LandingHeader";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardPreview from "@/components/landing/DashboardPreview";
import CallToAction from "@/components/landing/CallToAction";
import LandingFooter from "@/components/landing/LandingFooter";

const LandingPage: React.FC = () => {
  return (
    <AnimatedBackground className="min-h-screen flex flex-col">
      <FloatingElements />
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <LandingHeader />
        <Hero />
        <Features />
        <DashboardPreview />
        <CallToAction />
        <LandingFooter />
      </motion.div>
    </AnimatedBackground>
  );
};

export default LandingPage;

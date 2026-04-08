"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: "web-dev",
    number: "01",
    title: "Website & Apps Solution",
    subtitle: "Architecting buttery-smooth web dominance.",
    description: "A website is not an online brochure; it is your digital headquarters. We build bleeding-edge, highly optimized web applications using modern tech stacks to deliver experiences that simply refuse to be ignored.",
  },
  {
    id: "social-media",
    number: "02",
    title: "Social Media Management",
    subtitle: "Cultivating digital empires and an army of advocates.",
    description: "Your social media is your digital storefront. We turn it into a conversion engine. We develop, curate, and scale your brand's voice across every relevant platform, creating viral moments that translate directly into sustained customer loyalty.",
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI Chatbots & Receptionists",
    subtitle: "24/7 intelligent automation.",
    description: "We construct custom AI neural networks that serve as tireless sales associates and receptionists. Automate your customer service, qualify leads instantly, and capture revenue around the clock with zero human friction.",
  },
  {
    id: "performance-ads",
    number: "04",
    title: "Google/Meta Ads",
    subtitle: "Surgical lead generation designed for scale.",
    description: "We hate wasted ad spend. Our performance matrix is built on rigorous testing, hyper-targeted demographic mapping, and relentless optimization. Every dollar feeds a machine designed to multiply your ROI.",
  },
  {
    id: "brand-shoots",
    number: "05",
    title: "Brand Shoots",
    subtitle: "High-end visual storytelling engineered for impact.",
    description: "Amateur visuals destroy premium brands. Our in-house production team shoots commercial-grade photography and videography that captures the raw, sophisticated essence of your brand, triggering instant psychological trust.",
  },
  {
    id: "seo",
    number: "06",
    title: "SEO",
    subtitle: "Commanding the algorithm. Capturing high-intent traffic.",
    description: "We don't do basic SEO. We engineer infrastructure that tells Google exactly who rules your sector. From microscopic technical overhauls to aggressive backlink acquisition, we position your brand exactly where your highest-paying clients are looking.",
  },
  {
    id: "3d-modelling",
    number: "07",
    title: "3D Modelling",
    subtitle: "Bringing depth to your digital assets.",
    description: "We transform flat concepts into immersive 3D realities. Whether it's hyper-realistic product renders or cinematic 3D backgrounds for high-end video production, we engineer visual depth that commands attention.",
  }
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to open the global contact modal
  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('horsemann-open-modal'));
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className={`relative p-8 rounded-[2.5rem] md:rounded-[2.5rem] border transition-all duration-500 cursor-pointer overflow-hidden group ${
        isHovered 
          ? 'bg-gold/[0.08] border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.12)]' 
          : 'bg-white/[0.02] border-white/10 hover:border-gold/20'
      } ${index === 0 ? 'lg:col-span-3' : 'col-span-1'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`relative z-10 h-full flex flex-col ${index === 0 ? 'md:flex-row md:items-center md:justify-between md:gap-12' : ''}`}>
        <div className={`flex flex-col ${index === 0 ? 'md:w-1/2' : 'w-full'}`}>
          <div className="flex justify-between items-start mb-5">
            <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isHovered ? 'text-gold' : 'text-gold/50'}`}>
              {service.number}
            </span>
            <h3 className={`text-xl md:text-2xl lg:text-3xl font-light text-white text-right leading-tight group-hover:text-gold transition-colors duration-300 ${index === 0 ? 'max-w-none' : 'max-w-[200px]'}`}>
              {service.title}
            </h3>
          </div>

          <p className={`text-sm md:text-base lg:text-lg text-white/50 font-light mb-auto transition-colors duration-300 ${isHovered ? 'text-white/80' : ''} ${index === 0 ? 'min-h-0' : 'min-h-[3rem]'}`}>
            {service.subtitle}
          </p>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0, width: 'auto' }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`overflow-hidden ${index === 0 ? 'md:w-1/2 md:border-l md:border-t-0 md:pt-0 md:mt-0' : ''}`}
            >
              <div className={`pt-6 border-l border-gold/30 pl-6 mt-4 flex flex-col gap-5 ${index === 0 ? 'md:mt-0 md:pl-8' : ''}`}>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-light italic">
                   {service.description}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={openModal}
                    className="inline-flex items-center gap-3 text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold text-black bg-gold px-6 py-3 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_5px_20px_rgba(212,175,55,0.3)]"
                  >
                    Initiate Service
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`} />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="relative w-full py-24 md:py-40 bg-background overflow-hidden px-4 md:px-12">
      {/* Background Large Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full text-center">
        <h2 className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-white/[0.015] leading-none">
          Our Offerings
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-gold tracking-[0.4em] md:tracking-[0.6em] text-[10px] md:text-xs uppercase font-bold mb-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            The Arsenal We Deploy
          </span>
          <h2 className="text-3xl md:text-6xl text-white font-light uppercase tracking-[0.15em] md:tracking-[0.2em]">
            Our Offerings
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


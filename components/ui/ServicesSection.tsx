"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    id: "web-dev",
    title: "Website & Apps Solution",
    short: "Architecting web & app dominance.",
    long: "We build robust, scalable, and buttery-smooth web and mobile applications using bleeding-edge modern tech stacks designed for ultimate performance and conversion."
  },
  {
    id: "social-media",
    title: "Social Media Management",
    short: "Cultivating digital empires.",
    long: "We manage and scale your brand's voice across social platforms, engineering virality and sustained customer loyalty. Turn passive followers into an army of brand advocates."
  },
  {
    id: "ai-automation",
    title: "AI Chatbots & Receptionists",
    short: "24/7 intelligent automation.",
    long: "We construct custom AI neural networks that serve as tireless sales associates and receptionists. Automate your customer service, qualify leads instantly, and capture revenue around the clock with zero human friction."
  },
  {
    id: "performance-ads",
    title: "Google/Meta Ads",
    short: "Data-driven lead generation.",
    long: "Surgical paid campaigns designed to maximize ROI, minimize ad-spend waste, and pinpoint your exact target demographic at scale."
  },
  {
    id: "brand-shoots",
    title: "Brand Shoots",
    short: "Visual storytelling at scale.",
    long: "High-end photography and commercial videography that captures the raw essence of your brand. We craft visuals engineered for maximum psychological and emotional impact."
  },
  {
    id: "seo",
    title: "SEO",
    short: "Commanding the top ranks.",
    long: "We engineer your digital presence to outrank competitors and capture high-intent traffic through rigorous, data-driven optimization. We don't just optimize; we conquer the algorithm."
  }
];

const COUNT = services.length;

function ServiceCard({ i, service }: { i: number; service: typeof services[0] }) {
  // Using Framer Motion variants for clean, sequential expanding and closing
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any, staggerChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98, 
      y: -30,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full min-h-[420px] md:min-h-0 rounded-[2rem] md:rounded-2xl border border-gold/20 p-8 md:p-8 lg:p-10 backdrop-blur-3xl bg-black/80 shadow-[0_15px_50px_rgba(212,175,55,0.08)] relative overflow-hidden flex flex-col justify-center md:justify-start"
    >
      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Header */}
        <motion.div variants={itemVariants} className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-1.5 md:mb-2 gap-1 md:gap-4">
             <span className="text-gold tracking-widest text-sm md:text-xl uppercase font-bold shrink-0">
               0{i + 1}
             </span>
             <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-white drop-shadow-sm md:text-right w-full">
               {service.title}
             </h3>
          </div>
          <h4 className="text-sm md:text-lg text-white/40 font-light italic md:text-right">
            &ldquo;{service.short}&rdquo;
          </h4>
        </motion.div>
        
        {/* Content */}
        <motion.div variants={itemVariants} className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed border-l border-gold/40 pl-5 md:pl-6 flex flex-col gap-4 md:gap-5 mt-6 md:mt-6">
          <p className="font-light">{service.long}</p>
          <div className="pt-1">
            <Link 
              href={`/services#${service.id}`}
              className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-black bg-gold px-5 py-2.5 md:px-7 md:py-3.5 rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Deploy Strategy
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 md:w-3.5 md:h-3.5">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/5 to-gold/10 pointer-events-none mix-blend-screen" />
    </motion.div>
  );
}

export default function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const START_OFFSET = 0.15; // Delay card start until 15% scroll
    
    if (latest < START_OFFSET) {
      if (activeIndex !== -1) setActiveIndex(-1);
      return;
    }

    // Map remaining 85% of scroll to the 7 services
    const effectiveProgress = (latest - START_OFFSET) / (1 - START_OFFSET);
    let index = Math.floor(effectiveProgress * COUNT);
    
    if (index >= COUNT) index = COUNT - 1;
    if (index < 0) index = 0;
    
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={container} className="relative w-full h-[1050vh] bg-background border-t border-white/5">
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center overflow-hidden px-4 md:px-12 pointer-events-none pt-24 md:pt-32">
        
        {/* Section Header */}
        <div className="w-full flex flex-col items-center z-20 text-center px-4 shrink-0 mb-8 md:mb-12">
          <span className="text-gold tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-xs uppercase font-bold mb-2 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            The Arsenal We Deploy
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.15em] md:tracking-[0.2em] uppercase drop-shadow-2xl text-white">
            Our Offerings
          </h2>
        </div>

        {/* Card Container */}
        <div className="relative w-full max-w-3xl pointer-events-auto flex items-center justify-center min-h-[450px] md:min-h-[400px]">
           <AnimatePresence mode="wait">
             {activeIndex !== -1 && (
               <ServiceCard 
                 key={activeIndex} 
                 i={activeIndex} 
                 service={services[activeIndex]} 
               />
             )}
           </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-10 md:bottom-16 w-full flex items-center justify-center gap-2 md:gap-3 z-50">
           {services.map((_, i) => (
             <div 
               key={i} 
               className={`h-1.5 rounded-full transition-all duration-500 bg-white ${activeIndex === i ? "w-6 md:w-12 opacity-100" : "w-1.5 opacity-10"}`}
             />
           ))}
        </div>

      </div>
    </section>
  );
}

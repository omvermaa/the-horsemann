"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const services = [
  {
    title: "SEO",
    short: "Dominating search algorithms.",
    long: "We engineer your digital presence to outrank competitors and capture high-intent traffic through rigorous, data-driven optimization."
  },
  {
    title: "Social Media Marketing",
    short: "Cultivating digital communities.",
    long: "We manage and scale your brand's voice across social ecosystems, creating viral impact and sustained customer loyalty."
  },
  {
    title: "Google/Meta Ads",
    short: "Precision lead generation.",
    long: "Data-driven paid campaigns designed to maximize ROI, minimize waste, and pinpoint your exact target demographic at scale."
  },
  {
    title: "Brand Shoots",
    short: "Cinematic content creation.",
    long: "High-end photography and videography that captures the raw essence of your brand, engineered for maximum visual impact."
  },
  {
    title: "Website / App Development",
    short: "Architecting digital flagship experiences.",
    long: "We build robust, scalable, and buttery-smooth web and mobile applications using bleeding-edge modern tech stacks."
  },
  {
    title: "UI/UX Web Design",
    short: "Award-winning interfaces.",
    long: "Designing intuitive, visually stunning user journeys that captivate attention and convert visitors into lifelong advocates."
  }
];

function ServiceCard({ i, service, progress, isExpanded, onToggle }: { i: number, service: typeof services[0], progress: MotionValue<number>, isExpanded: boolean, onToggle: () => void }) {
  // Stagger the start and end of each card's animation based on its index
  const start = i * 0.08;
  const end = start + 0.4;
  
  // They start lower than final position and perfectly drop into the grid offset
  const yOffset = useTransform(progress, [start, end], ["50vh", "0vh"]);
  const scale = useTransform(progress, [start, end], [0.8, 1]);

  return (
    <motion.div 
      className="flex flex-col relative w-full rounded-3xl border border-white/10 p-8 md:p-10 backdrop-blur-xl bg-black/60 overflow-hidden cursor-pointer h-auto transition-colors duration-300"
      style={{ y: yOffset, scale }}
      initial="rest"
      animate={isExpanded ? "hovered" : "rest"}
      whileHover="hovered"
      data-expanded={isExpanded}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-full">
            <div className="flex items-start justify-between mb-4 gap-4">
               <span className="text-gold tracking-widest text-lg md:text-xl uppercase opacity-80 font-medium shrink-0">0{i + 1}</span>
               <h3 className="text-2xl md:text-3xl font-light tracking-wide text-foreground drop-shadow-md text-right">{service.title}</h3>
            </div>
            <h4 className="text-lg md:text-xl text-white/80 font-light pr-4">{service.short}</h4>
          </div>
          
          <motion.div 
            variants={{
              rest: { opacity: 0, height: 0, marginTop: 0 },
              hovered: { opacity: 1, height: "auto", marginTop: "1.5rem" }
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="text-white/80 text-base leading-relaxed border-l-2 border-gold/50 pl-4 overflow-hidden"
          >
            {service.long}
          </motion.div>
        </div>
        
        {/* Glow effect on hover */}
        <motion.div 
           className="absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/5 to-gold/15 pointer-events-none mix-blend-screen opacity-0"
           variants={{
              rest: { opacity: 0 },
              hovered: { opacity: 1 }
           }}
           transition={{ duration: 0.4 }}
        />
        
        {/* Border glow */}
        <motion.div
           className="absolute inset-0 rounded-3xl border border-gold/0 pointer-events-none"
           variants={{
             rest: { borderColor: "rgba(212, 175, 55, 0)" },
             hovered: { borderColor: "rgba(212, 175, 55, 0.4)" }
           }}
           transition={{ duration: 0.4 }}
        />
    </motion.div>
  );
}

export default function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Calculate the position transform for the title text
  const titleY = useTransform(scrollYProgress, [0, 0.2], ["20px", "0px"]);

  return (
    <section ref={container} className="relative w-full h-[400vh] bg-background border-t border-white/5">
      <div className="sticky top-0 min-h-screen w-full flex flex-col justify-center items-center overflow-visible pb-[20vh] px-4 md:px-12">
        
        <motion.div 
          className="w-full max-w-7xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20"
          style={{ y: titleY }}
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-light tracking-widest uppercase mb-4 drop-shadow-lg text-foreground">
              Our Offerings
            </h2>
            <p className="text-gold tracking-widest text-sm md:text-base uppercase opacity-80">
              The Arsenal We Deploy
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl relative z-10 items-start">
           {services.map((service, i) => (
              <ServiceCard 
                key={i} 
                i={i} 
                service={service} 
                progress={scrollYProgress} 
                isExpanded={expandedIndex === i}
                onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
              />
           ))}
        </div>
      </div>
    </section>
  );
}

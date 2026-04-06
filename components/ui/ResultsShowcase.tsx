"use client";
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/* ───────────────────────────────────────────────
   Phone Frame – a realistic mobile mockup in CSS
   ─────────────────────────────────────────────── */
function PhoneFrame({ 
  src, 
  alt, 
  label, 
  accentColor = "#d4af37",
  delay = 0,
  isBefore = false
}: { 
  src: string; 
  alt: string; 
  label: string; 
  accentColor?: string;
  delay?: number;
  isBefore?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.9, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {/* Label above phone */}
      <motion.span
        className="text-xs uppercase tracking-[0.4em] font-bold"
        style={{ color: accentColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
      >
        {label}
      </motion.span>

      {/* Phone bezel */}
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.03, rotateY: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ perspective: 1000 }}
      >
        {/* Glow behind phone */}
        <div 
          className="absolute -inset-4 rounded-[3.5rem] opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-2xl"
          style={{ background: `radial-gradient(circle, ${accentColor}40, transparent)` }}
        />
        
        {/* Phone body */}
        <div className="relative bg-[#1a1a1a] rounded-[1.5rem] md:rounded-[2.5rem] p-[4px] md:p-[6px] shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08)] border border-white/[0.06]">
          
          {/* Top notch - Smaller on mobile */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[40px] md:w-[90px] h-[12px] md:h-[25px] bg-[#1a1a1a] rounded-b-xl md:rounded-b-2xl flex items-center justify-center">
            <div className="w-[20px] md:w-[50px] h-[3px] md:h-[5px] bg-[#0a0a0a] rounded-full" />
          </div>

          {/* Screen - Responsive sizing */}
          <div className="relative w-[40vw] h-[86vw] md:w-[320px] md:h-[690px] rounded-[1.3rem] md:rounded-[2.2rem] overflow-hidden bg-black">
            <Image
              src={`${src}?v=3`}
              alt={alt}
              fill
              className={`object-cover object-top transition-all duration-700 ${isBefore ? 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100' : ''}`}
              sizes="(max-width: 768px) 40vw, 320px"
              quality={90}
            />
          </div>

          {/* Bottom bar */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-20 w-[60px] md:w-[100px] h-[3px] md:h-[4px] bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────────────────────
   Animated Arrow between before/after
   ────────────────────────────────────── */
function AnimatedArrow({ growth }: { growth: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="hidden lg:flex flex-col items-center justify-center gap-3 py-8 md:py-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Pulsing arrow */}
      <motion.div
        className="relative"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg 
          width="60" 
          height="60" 
          viewBox="0 0 60 60" 
          fill="none"
          className="rotate-90 md:rotate-0"
        >
          <motion.path
            d="M10 30 L42 30 M32 20 L42 30 L32 40"
            stroke="#d4af37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </svg>
      </motion.div>

      {/* Growth indicator */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <span className="text-gold text-2xl md:text-3xl font-light">{growth}</span>
        <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">Growth</span>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────────
   Case study data
   ────────────────────── */
const caseStudies = [
  {
    id: 0,
    title: "Case Study 01",
    before: { src: "/before1.jpeg", alt: "Instagram profile before – 494 followers" },
    after:  { src: "/after1.jpeg",  alt: "Instagram profile after – 90.2K followers" },
    growth: "182×",
    stats: [
      { value: "494",   label: "Starting Followers", sub: "Before" },
      { value: "90.2K", label: "Current Followers",  sub: "After" },
      { value: "12.9M", label: "Top Views",          sub: "Single Reel" },
    ],
  },
  {
    id: 1,
    title: "Case Study 02",
    before: { src: "/before2.jpeg", alt: "Client profile before growth" },
    after:  { src: "/after2.jpeg",  alt: "Client profile after growth" },
    growth: "50×",
    stats: [
      { value: "200",   label: "Starting Followers", sub: "Before" },
      { value: "10K+",  label: "Current Followers",  sub: "After" },
      { value: "18M",  label: "Top Views",          sub: "Campaign" },
    ],
  },
];

/* ──────────────────────
   Main Results Showcase
   ────────────────────── */
export default function ResultsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStudy, setActiveStudy] = useState(0);
  const study = caseStudies[activeStudy];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-40 overflow-hidden bg-background"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ y: bgY }}
      >
        <div 
          className="w-full h-full"
          style={{ 
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }} 
        />
      </motion.div>

      {/* Vertical accent line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent origin-top"
        style={{ scaleY: lineScale }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            className="text-gold text-xs uppercase tracking-[0.5em] font-bold block mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Case Studies
          </motion.span>
          <motion.h2
            className="text-4xl md:text-7xl lg:text-8xl text-white font-light tracking-tighter leading-none mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Results Speak{" "}
            <span className="text-gold italic">for Themselves.</span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Real transformation. Real numbers. See how we scaled personal brands
            from the ground up.
          </motion.p>
        </div>

        {/* ── Tab switcher ── */}
        <div className="flex justify-center mb-14">
          <div className="relative inline-flex bg-white/5 rounded-full p-5 border border-white/10 backdrop-blur-md">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActiveStudy(i)}
                className={`relative z-10 px-6 py-2.5 text-[11px] uppercase tracking-[0.3em] font-bold transition-colors duration-300 rounded-full ${
                  activeStudy === i ? "text-black" : "text-white/50 hover:text-white/80"
                }`}
              >
                {cs.title}
                {activeStudy === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gold rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Animated phone showcase ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Phones row */}
            <div className="flex flex-row items-start justify-center gap-4 md:gap-16 lg:gap-24">
              <PhoneFrame
                src={study.before.src}
                alt={study.before.alt}
                label="Before"
                accentColor="#888888"
                delay={0}
                isBefore={true}
              />

              <AnimatedArrow growth={study.growth} />

              <PhoneFrame
                src={study.after.src}
                alt={study.after.alt}
                label="After"
                accentColor="#d4af37"
                delay={0.3}
                isBefore={false}
              />
            </div>

            {/* Stats ribbon */}
            <motion.div
              className="mt-20 md:mt-28 flex flex-wrap justify-center gap-12 md:gap-24"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {study.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * i + 0.4 }}
                >
                  <span className="text-gold text-4xl md:text-6xl font-light mb-2">{stat.value}</span>
                  <span className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-1">{stat.label}</span>
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.3em]">{stat.sub}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

"use client";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────
   Project data — grouped as requested
   ───────────────────────────────────── */
const projects = [
  {
    id: 1,
    name: "Project Alpha",
    description: "Brand-first e-commerce experience",
    slides: [{ desktop: "/web1.png", mobile: null }],
  },
  {
    id: 2,
    name: "Project Bravo",
    description: "High-conversion landing system",
    slides: [{ desktop: "/web2.png", mobile: "/web2-mobile.PNG" }],
  },
  {
    id: 3,
    name: "The Horizon Suite",
    description: "Delta, Charlie & Foxtrot internal ecosystem",
    slides: [
      { desktop: "/web3.png", mobile: "/web3-mobile.PNG" },
      { desktop: "/web4.png", mobile: "/web4-mobile.PNG" },
      { desktop: "/web6.png", mobile: "/web6-mobile.PNG" },
    ],
  },
  {
    id: 4,
    name: "Project Echo",
    description: "Performance marketing site",
    slides: [{ desktop: "/web5.png", mobile: "/web5-phone.png" }],
  },
];

/* ──────────────────────────
   Laptop Frame
   ────────────────────────── */
function LaptopFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: 820 }}>
      <div className="relative bg-[#1a1a1a] rounded-t-xl md:rounded-t-2xl p-[6px] md:p-[8px] border border-white/[0.06] shadow-[0_-4px_60px_rgba(0,0,0,0.5)]">
        <div className="absolute top-[3px] left-1/2 -translate-x-1/2 z-30 w-[6px] h-[6px] rounded-full bg-[#333] border border-[#222]" />
        <div className="relative w-full aspect-[16/10] rounded-md md:rounded-lg overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain" // Fit entire image
                sizes="(max-width: 768px) 95vw, 820px"
                quality={85}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="relative mx-auto" style={{ width: "106%" , marginLeft: "-3%" }}>
        <div className="h-[10px] md:h-[14px] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] rounded-b-xl border-x border-b border-white/[0.04]" />
        <div className="mx-auto w-[20%] h-[3px] bg-[#333] rounded-b-sm" />
      </div>
    </div>
  );
}

/* ──────────────────────────
   Mobile Frame
   ────────────────────────── */
function MobileFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      <div className="relative bg-[#1a1a1a] rounded-[2rem] p-[5px] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] border border-white/[0.06]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[70px] h-[20px] bg-[#1a1a1a] rounded-b-xl flex items-center justify-center">
          <div className="w-[40px] h-[4px] bg-[#0a0a0a] rounded-full" />
        </div>
        <div className="relative w-[180px] h-[390px] md:w-[200px] md:h-[432px] rounded-[1.7rem] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain" // Fit entire image
                sizes="200px"
                quality={85}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 z-20 w-[80px] h-[3px] bg-white/20 rounded-full" />
      </div>
    </div>
  );
}

/* ──────────────────────────
   Single project card
   ────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = project.slides.length;
  const slide = project.slides[currentSlide];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Carousel transition
  useEffect(() => {
    if (slideCount <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideCount]);

  return (
    <motion.div
      ref={ref}
      className="relative py-16 md:py-24"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="absolute top-8 right-6 md:right-16 text-white/[0.03] text-[8rem] md:text-[12rem] font-light leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <motion.div
        className="mb-10 md:mb-14 px-2"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-3">
          Project {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-2xl md:text-4xl text-white font-light tracking-tight mb-2">
          {project.name}
        </h3>
        <p className="text-white/40 text-sm md:text-base font-light">
          {project.description}
        </p>

        {/* Carousel Indicators */}
        {slideCount > 1 && (
          <div className="flex gap-2 mt-6">
            {project.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 transition-all duration-300 rounded-full ${
                  currentSlide === i ? "w-8 bg-gold" : "w-2 bg-white/10"
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        className="flex items-end justify-center gap-6 md:gap-10"
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
      >
        {/* Laptop */}
        <div className={`${slide.mobile ? "flex-1 max-w-[700px]" : "w-full max-w-[820px]"}`}>
          <LaptopFrame src={slide.desktop} alt={`${project.name} desktop`} />
        </div>

        {/* Phone */}
        {slide.mobile && (
          <motion.div
            className="relative -ml-16 md:-ml-24 mb-0 z-10 hidden sm:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MobileFrame
              src={slide.mobile}
              alt={`${project.name} mobile`}
            />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="mt-16 md:mt-20 mx-auto w-[60px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </motion.div>
  );
}

export default function WebProjectsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 overflow-hidden bg-background"
    >
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <div className="absolute left-6 md:left-16 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute right-6 md:right-16 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-16 md:mb-24">
          <motion.span
            className="text-gold text-xs uppercase tracking-[0.5em] font-bold block mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Web Development
          </motion.span>
          <motion.h2
            className="text-4xl md:text-7xl lg:text-8xl text-white font-light tracking-tighter leading-none mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Crafted with <span className="text-gold italic">Precision.</span>
          </motion.h2>
          <motion.p
            className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pixel-perfect websites engineered for performance, beauty, and conversion.
          </motion.p>
        </div>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

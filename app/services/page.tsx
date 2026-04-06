"use client";

import { motion } from "framer-motion";
import SmoothScroll from "@/components/ui/SmoothScroll";
import FloatingNav from "@/components/ui/FloatingNav";
import OverlayText from "@/components/ui/OverlayText";
import Image from "next/image";

const detailedServices = [
  {
    id: "web-dev",
    number: "01",
    title: "Website & Apps Solution",
    subtitle: "Architecting buttery-smooth web dominance.",
    description: "A website is not an online brochure; it is your digital headquarters. We build bleeding-edge, highly optimized web applications using modern tech stacks (Next.js, React, WebGL) to deliver experiences that simply refuse to be ignored.",
    points: ["Headless Commerce Next.js", "Custom WebApp Architecture", "Sub-second Load Optimization", "Immersive Canvas/WebGL"],
    color: "from-emerald-500/20 to-transparent",
    image: "/web_v2.png",
  },
  {
    id: "social-media",
    number: "02",
    title: "Social Media Management",
    subtitle: "Cultivating digital empires and an army of advocates.",
    description: "Your social media is your digital storefront. We turn it into a conversion engine. We develop, curate, and scale your brand's voice across every relevant platform, creating viral moments that translate directly into sustained customer loyalty.",
    points: ["Omnichannel Grid Management", "Viral Content Engineering", "Community Cultivation", "Influencer Syndication"],
    color: "from-purple-500/20 to-transparent",
    image: "/social_v2.png",
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI Chatbots & Receptionists",
    subtitle: "24/7 intelligent automation.",
    description: "We construct custom AI neural networks that serve as tireless sales associates and receptionists. Automate your customer service, qualify leads instantly, and capture revenue around the clock with zero human friction.",
    points: ["Custom NLP Conversational Flows", "Automated Lead Qualification", "24/7 Appointment Scheduling", "Dynamic CRM Integration"],
    color: "from-cyan-500/20 to-transparent",
    image: "/ai_chatbots_v3.png",
  },
  {
    id: "performance-ads",
    number: "04",
    title: "Google/Meta Ads",
    subtitle: "Surgical lead generation designed for scale.",
    description: "We hate wasted ad spend. Our performance matrix is built on rigorous testing, hyper-targeted demographic mapping, and relentless optimization. Every dollar feeds a machine designed to multiply your ROI.",
    points: ["Meta & Google Ecosystems", "Hyper-Targeted Lookalikes", "A/B Creative Warfare", "LTV Maximization"],
    color: "from-red-500/20 to-transparent",
    image: "/ads_v2.png",
  },
  {
    id: "brand-shoots",
    number: "05",
    title: "Brand Shoots",
    subtitle: "High-end visual storytelling engineered for impact.",
    description: "Amateur visuals destroy premium brands. Our in-house production team shoots commercial-grade photography and videography that captures the raw, sophisticated essence of your brand, triggering instant psychological trust.",
    points: ["Commercial Videography", "High-Fashion Editorial Shoots", "Product Glamour Shots", "Dynamic Motion Graphics"],
    color: "from-amber-500/20 to-transparent",
    image: "/shoots_v2.png",
  },
  {
    id: "seo",
    number: "06",
    title: "SEO",
    subtitle: "Commanding the algorithm. Capturing high-intent traffic.",
    description: "We don't do basic SEO. We engineer infrastructure that tells Google exactly who rules your sector. From microscopic technical overhauls to aggressive backlink acquisition, we position your brand exactly where your highest-paying clients are looking.",
    points: ["Technical Infrastructure Audits", "Keyword Dominance Strategy", "High-Authority Link Building", "Content Empire Creation"],
    color: "from-blue-500/20 to-transparent",
    image: "/seo_v2.png",
  }
];

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <main className="relative w-full min-h-screen bg-background selection:bg-gold selection:text-black pb-32">
        <FloatingNav />

        {/* Hero Section */}
        <section className="relative w-full pt-40 pb-20 md:pt-56 md:pb-40 px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gold text-[10px] md:text-sm uppercase tracking-[0.5em] font-bold block mb-6">
              The Arsenal
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white uppercase drop-shadow-2xl leading-none">
              Precision <br/> Engineered <span className="italic text-gold">Solutions.</span>
            </h1>
            <p className="mt-8 text-white/50 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We don&apos;t offer services; we deploy calculated strategies. 
              Review the exact mechanisms we use to assemble market leaders.
            </p>
          </motion.div>
        </section>

        {/* Services Stack */}
        <div className="w-full flex flex-col gap-32 md:gap-48 px-4 md:px-12 max-w-7xl mx-auto">
          {detailedServices.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <section 
                key={service.id} 
                id={service.id} 
                className="scroll-mt-40 relative flex flex-col items-center"
              >
                {/* Large Background Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-bold text-white/[0.02] pointer-events-none select-none z-0">
                  {service.number}
                </div>

                <div className={`w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 relative z-10 items-center justify-between`}>
                  
                  {/* Abstract Graphic Element Box */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full lg:w-1/2 aspect-square max-w-[500px] relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl group"
                  >
                    {/* Background AI Gen Image */}
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000"
                    />

                    {/* Inner glowing effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-40 mix-blend-screen blur-xl pointer-events-none`} />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-overlay pointer-events-none" />
                    
                    <div className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden pointer-events-none">
                      {/* Geometric representation */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full mix-blend-overlay"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-2/3 h-2/3 rounded-full flex items-center justify-center"
                      >
                         <span className="text-gold text-2xl md:text-3xl tracking-widest font-bold drop-shadow-[0_0_15px_rgba(212,175,55,1)]">{service.number}</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-gold text-lg font-light tracking-widest">{service.number}</span>
                        <div className="h-px w-12 bg-gold/50" />
                        <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Protocol</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight mb-4">
                        {service.title}
                      </h2>
                      <h3 className="text-xl text-white/70 italic font-light mb-6">
                        "{service.subtitle}"
                      </h3>
                      <p className="text-white/40 leading-relaxed font-light mb-8">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.points.map((point, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                            <span className="text-sm text-white/80 font-light">{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12">
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('horsemann-open-modal'))}
                          className="inline-flex items-center gap-4 group"
                        >
                          <span className="text-[10px] text-white/50 group-hover:text-gold uppercase tracking-[0.3em] font-bold transition-colors">
                            Initiate Service
                          </span>
                          <div className="w-8 h-px bg-white/20 group-hover:bg-gold group-hover:w-12 transition-all duration-300" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer CTA */}
        <section className="mt-32 md:mt-56 w-full text-center px-4">
          <OverlayText>
             <h2 className="text-3xl md:text-5xl text-foreground tracking-widest uppercase mb-10">Deploy Strategy.</h2>
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('horsemann-open-modal'))}
               className="inline-block px-8 py-4 border border-white/20 hover:border-gold hover:text-gold transition-colors duration-500 tracking-widest uppercase text-sm"
             >
               Contact Us
             </button>
          </OverlayText>
        </section>

      </main>
    </SmoothScroll>
  );
}

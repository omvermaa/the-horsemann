"use client";
import { useRef, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Update frameCount based on the actual number of generated assets
  const frameCount = 68; 
  const { images, loaded } = useImagePreloader(frameCount, '/horse/frame_', 3, 'jpg');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  const drawImage = (index: number) => {
    if (!canvasRef.current || !images[index]) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    // Detect mobile for custom focus
    const isMobile = window.innerWidth < 768;

    // Object-cover logic for Canvas
    const scale = Math.max(canvasRef.current.width / img.width, canvasRef.current.height / img.height);
    
    // Horizontal focus point (0.5 is center, >0.5 moves image left to show more of the right side)
    // On mobile, focus more on the warrior/horse group (around 62% of image width)
    const focusX = isMobile ? 0.62 : 0.5;
    const x = (canvasRef.current.width / 2) - (img.width * focusX) * scale;
    
    const y = 0; // Top-aligned to prevent cropping the warrior's head

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Initial draw and window resize handling
  useEffect(() => {
    if (!loaded) return;
    
    // Initial draw
    drawImage(Math.floor(frameIndex.get()));

    // Resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce the redraw to avoid stuttering during resize
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        drawImage(Math.floor(frameIndex.get()));
      }, 50);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [loaded]);

  // Draw on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      drawImage(Math.floor(latest));
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-background">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 tracking-widest text-sm uppercase">
            Loading Sequence...
          </div>
        )}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
        />
        {/* Gradients to blend canvas smoothly into the background color */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>
    </div>
  );
}

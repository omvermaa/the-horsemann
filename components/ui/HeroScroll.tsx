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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    
    // Calculate scroll progress (0 to 1) for focus interpolation
    const progress = index / (frameCount - 1);

    // Detect mobile for custom focus
    const isMobile = window.innerWidth < 768;

    // Use current canvas dimensions (stabilized in useEffect)
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    
    // Dynamic Focus Logic
    // Desktop: Always center (0.5)
    // Mobile: Smoothly pan from warrior (0.4) to horse (0.75) as we scroll
    let focusX = 0.5;
    if (isMobile) {
      focusX = 0.4 + (progress * 0.35);
    }

    const x = (canvas.width / 2) - (img.width * focusX) * scale;
    const y = 0; // Top-aligned to prevent cropping the warrior's head

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Initial draw and window resize handling
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Set initial dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initial draw
    drawImage(Math.floor(frameIndex.get()));

    // Resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      // Only resize if width changes or if height changes significantly (> 100px)
      // This prevents "jumping" when mobile address bar hides/shows
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      const widthChanged = newWidth !== canvas.width;
      const heightChangedSignificant = Math.abs(newHeight - canvas.height) > 100;

      if (widthChanged || heightChangedSignificant) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          canvas.width = newWidth;
          canvas.height = newHeight;
          drawImage(Math.floor(frameIndex.get()));
        }, 50);
      }
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

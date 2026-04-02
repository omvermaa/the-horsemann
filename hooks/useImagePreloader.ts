"use client";
import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, pathPrefix: string, padLength: number = 4, extension: string = 'jpg', optimize: boolean = true) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImage = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const paddedIndex = index.toString().padStart(padLength, '0');
        const rawPath = `${pathPrefix}${paddedIndex}.${extension}`;
        
        // Use Next.js Image Optimization API if 'optimize' is true
        // This auto-converts to WebP and compresses the file on the fly
        if (optimize) {
          img.src = `/_next/image?url=${encodeURIComponent(rawPath)}&w=1920&q=75`;
        } else {
          img.src = rawPath;
        }

        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setImages([...loadedImages]);
            setLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          loadedCount++; // Count as processed even if failed
          resolve();
        };

        loadedImages[index - 1] = img;
      });
    };

    // Load first 5 frames immediately for instant interactivity
    const priorityFrames = Array.from({ length: Math.min(5, frameCount) }, (_, i) => i + 1);
    
    const loadRemaining = async () => {
      // Load and wait for priority frames first
      await Promise.all(priorityFrames.map(loadImage));
      
      // Load the rest in batches of 10 to avoid hammering the network
      for (let i = priorityFrames.length + 1; i <= frameCount; i += 10) {
        const batch = Array.from({ length: Math.min(10, frameCount - i + 1) }, (_, idx) => i + idx);
        await Promise.all(batch.map(loadImage));
      }
    };

    loadRemaining();
  }, [frameCount, pathPrefix, padLength, extension, optimize]);

  return { images, loaded };
}

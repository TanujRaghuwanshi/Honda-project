"use client";
import { useRef, useEffect, useCallback, useState } from "react";
import { MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function ZondaScrollCanvas({ scrollYProgress, totalFrames, imageFolderPath }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isLoadedRef = useRef(false);

  const lastRenderedFrameRef = useRef<number>(-1);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames], {
    clamp: true,
  });

  const renderFrame = useCallback((index: number, force: boolean = false) => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesRef.current.length || !isLoadedRef.current) return;

    const currentFrame = Math.max(1, Math.min(totalFrames, Math.round(index)));
    
    // Skip if we're trying to render the same frame and not forcing a redraw
    if (!force && currentFrame === lastRenderedFrameRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[currentFrame - 1];

    // Fallback logic: if the current image isn't loaded, try to find the nearest previous loaded image
    if (!img || img.naturalWidth === 0) {
      let foundFallback = false;
      for (let i = currentFrame - 1; i >= 1; i--) {
        const fallbackImg = imagesRef.current[i - 1];
        if (fallbackImg && fallbackImg.naturalWidth > 0) {
          img = fallbackImg;
          foundFallback = true;
          break;
        }
      }
      if (!foundFallback) return; // Still nothing to draw
    }

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displayWidth = Math.floor(rect.width);
    const displayHeight = Math.floor(rect.height);

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.min(displayWidth / imgWidth, displayHeight / imgHeight);

    const x = (displayWidth - imgWidth * scale) / 2;
    const y = (displayHeight - imgHeight * scale) / 2;

    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);

    lastRenderedFrameRef.current = currentFrame;
    ctx.restore();
  }, [totalFrames]);

  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const images: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= totalFrames; i++) {
        const paddedIndex = i.toString().padStart(3, "0");
        const img = new Image();
        const promise = new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => {
            const fallbackImg = new Image();
            fallbackImg.onload = () => {
              images[i - 1] = fallbackImg;
              resolve(true);
            };
            fallbackImg.onerror = () => resolve(false);
            fallbackImg.src = `${imageFolderPath}/${i}.jpg`;
          };
        });
        img.src = `${imageFolderPath}/ezgif-frame-${paddedIndex}.jpg`;
        images.push(img);
        promises.push(promise);
      }

      await Promise.all(promises);
      if (isMounted) {
        imagesRef.current = images;
        isLoadedRef.current = true;
        renderFrame(frameIndex.get(), true);
      }
    };

    loadImages();
    return () => { isMounted = false; };
  }, [totalFrames, imageFolderPath, renderFrame, frameIndex]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  useEffect(() => {
    const handleResize = () => renderFrame(frameIndex.get(), true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame, frameIndex]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      className="absolute top-0 left-0 z-0 pointer-events-none"
    />
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface EetirpLogoProps {
  className?: string;
  isAnimated?: boolean;
  lightMode?: boolean;
  showSlogan?: boolean;
}

const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0Tb6eZNPswTOWvOMp-_Cr62CASvc3c1--t-f0c7jsDTf3DDa7VXGVV11ESxGD_HPDFE6RpScmJ370lwrrXmeazaZQYIj8m7hn0bJnYSqk3_XU5Dcss9V5eW-P-xrSNI2qfpfd9ie5Xo4uoeJkjFjwkdZpiCEgEQwCCuNfJ2qP6w02tLoQGSCGsEMAaHgvSpakzfOeNKfmFZIVxuo120cSRST7WO0Yiycj1foar3k9F_g1CBYb24k1YjOVtZMW5K-7OamqD3AzPLU';

// Global cache to avoid double loading/processing of the transparent assets
const logoCache: { [key: string]: string } = {};

export default function EetirpLogo({ 
  className = "w-full h-full", 
  isAnimated = true, 
  lightMode = false,
  showSlogan = true
}: EetirpLogoProps) {
  const [cleanedSrc, setCleanedSrc] = useState<string>(
    logoCache[`${logoUrl}_slogan_${showSlogan}`] || ''
  );

  useEffect(() => {
    const cacheKey = `${logoUrl}_slogan_${showSlogan}`;
    if (logoCache[cacheKey]) {
      setCleanedSrc(logoCache[cacheKey]);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setCleanedSrc(logoUrl);
        return;
      }

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      canvas.width = w;
      // Crop bottom 30% if slogan/tagline is to be hidden (leaves top 70%)
      const cropHeight = showSlogan ? h : Math.round(h * 0.70);
      canvas.height = cropHeight;

      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, w, cropHeight);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          
          // Identify white/grey checkerboard background pixels (high value + low color saturation)
          if (r >= 170 && g >= 170 && b >= 170 && maxDiff <= 25) {
            const average = (r + g + b) / 3;
            if (average > 240) {
              data[i + 3] = 0; // Completely transparent
            } else if (average > 175) {
              // Smooth feathering to avoid jagged margins near logo edges
              const alphaFraction = (average - 175) / 65; // 0 at 175, 1 at 240
              const targetAlpha = Math.round((1 - alphaFraction) * 255);
              if (targetAlpha < data[i + 3]) {
                data[i + 3] = targetAlpha;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const processedDataUrl = canvas.toDataURL('image/png');
        logoCache[cacheKey] = processedDataUrl;
        setCleanedSrc(processedDataUrl);
      } catch (e) {
        console.error("Failed image transparency processing: ", e);
        setCleanedSrc(logoUrl); // Fallback to raw on failure
      }
    };

    img.onerror = () => {
      setCleanedSrc(logoUrl); // Fallback to raw
    };

    img.src = logoUrl;
  }, [showSlogan]);

  // Premium Framer Motion Transition Matching Original Specs
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      variants={isAnimated ? containerVariants : undefined}
      initial={isAnimated ? "hidden" : "visible"}
      animate="visible"
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
    >
      {cleanedSrc ? (
        <img
          alt="EETIRP Logo"
          className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-300"
          src={cleanedSrc}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#0b1f3b]/5 animate-pulse flex items-center justify-center">
          <span className="font-mono text-xs text-[#0b1f3b]/30">LOADING LOGO...</span>
        </div>
      )}
    </motion.div>
  );
}

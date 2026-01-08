// src/components/Lottie/Lottie.tsx
import { useEffect, useRef } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

interface LottieProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export const Lottie = ({
  animationData,
  loop = true,
  autoplay = true,
  className,
}: LottieProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !animationData) return;

    animRef.current?.destroy();
    animRef.current = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop,
      autoplay,
      animationData,
    });

    return () => {
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, [animationData, loop, autoplay]);

  return <div ref={containerRef} className={className} />;
};
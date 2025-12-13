import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768) {
  // Initialize with undefined to prevent hydration mismatch
  // Will be set to actual value after client-side hydration
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value on client
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  // Return false during SSR and initial render to prevent layout shift
  // This ensures consistent behavior between server and client
  return isMobile ?? false;
}
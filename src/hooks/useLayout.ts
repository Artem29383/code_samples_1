import { useState, useEffect } from 'react';
import {
  Viewport,
  isMobile,
  isTablet,
  isDesktop,
  isBigDesktop,
  isLargeDesktop,
  ViewportKey,
} from 'styles/media';

export default function useLayout() {
  const [current, setLayout] = useState<ViewportKey>(() => {
    if (window.innerWidth > Viewport.bigDesktop) {
      return 'largeDesktop';
    }

    if (window.innerWidth > Viewport.desktop) {
      return Viewport[Viewport.bigDesktop] as ViewportKey;
    }

    if (window.innerWidth > Viewport.tablet) {
      return Viewport[Viewport.desktop] as ViewportKey;
    }

    if (window.innerWidth > Viewport.mobile) {
      return Viewport[Viewport.tablet] as ViewportKey;
    }

    return Viewport[Viewport.mobile] as ViewportKey;
  });

  /* TODO Add useEventListener hook */
  useEffect(() => {
    const resizeHandler = () => {
      if (isMobile()) {
        if (current !== 'mobile') {
          setLayout('mobile');
        }
      } else if (isTablet()) {
        if (current !== 'tablet') {
          setLayout('tablet');
        }
      } else if (isDesktop()) {
        if (current !== 'desktop') {
          setLayout('desktop');
        }
      } else if (isBigDesktop()) {
        if (current !== 'bigDesktop') {
          setLayout('bigDesktop');
        }
      } else if (isLargeDesktop()) {
        if (current !== 'largeDesktop') {
          setLayout('largeDesktop');
        }
      }
    };

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [current]);

  return current;
}

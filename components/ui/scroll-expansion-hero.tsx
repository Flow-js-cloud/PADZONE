'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll as EventListener);
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  const mediaWidth = 300 + scrollProgress * 1250;
  const mediaHeight = 400 + scrollProgress * 400;
  const textTranslateX = scrollProgress * 150;

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <>
      {/* ── Version MOBILE : hero plein écran impactant ── */}
      <div className='lg:hidden overflow-x-hidden' style={{ minHeight: '88svh' }}>
        <section className='relative flex flex-col items-center justify-center min-h-[88vh] overflow-hidden'>
          <Image
            src={bgImageSrc}
            alt='Background'
            fill
            sizes='100vw'
            className='object-cover object-center scale-105'
            priority
          />
          {/* Gradient overlays */}
          <div className='absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void' />
          <div className='absolute inset-0 bg-gradient-to-r from-void/40 via-transparent to-void/40' />
          {/* Subtle grid */}
          <div className='absolute inset-0 opacity-[0.07]'
            style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* Corner accents */}
          <div className='absolute top-20 left-6 w-8 h-8' style={{ borderTop: "2px solid rgba(0,229,255,0.5)", borderLeft: "2px solid rgba(0,229,255,0.5)" }} />
          <div className='absolute top-20 right-6 w-8 h-8' style={{ borderTop: "2px solid rgba(0,229,255,0.5)", borderRight: "2px solid rgba(0,229,255,0.5)" }} />

          <div className='relative z-10 text-center px-6 flex flex-col items-center gap-5 w-full max-w-sm'>
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
              className='font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-1.5 rounded-full'
              style={{ color: "#00e5ff", border: "1px solid rgba(0,229,255,0.3)", background: "rgba(0,229,255,0.06)" }}
            >
              Tapis Gaming Premium
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.45 }}
              className='font-orbitron font-black text-5xl leading-[1.1] tracking-tight'
            >
              <span style={{ color: "#00e5ff", textShadow: "0 0 25px rgba(0,229,255,0.6)" }}>ÉLÈVE</span>
              <br />
              <span className='text-white'>TON SETUP</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
              className='font-rajdhani text-white/60 text-sm leading-relaxed'
            >
              Anime · Jeux Vidéo · RGB LED<br />Qualité premium, livraison internationale
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.4 }}
              className='flex flex-col gap-3 w-full'
            >
              <Link href='/categories'
                className='block w-full text-center py-4 rounded-xl font-orbitron font-bold text-sm tracking-wider uppercase'
                style={{ background: "linear-gradient(135deg, #00e5ff, #0088aa)", color: "#020209", boxShadow: "0 0 24px rgba(0,229,255,0.35)" }}
              >
                Explorer les collections
              </Link>
              <Link href='/categories/rgb'
                className='block w-full text-center py-3 rounded-xl font-rajdhani font-semibold text-sm'
                style={{ border: "1px solid rgba(0,229,255,0.3)", color: "#00e5ff", background: "rgba(0,229,255,0.05)" }}
              >
                RGB LED — Nouveautés →
              </Link>
            </motion.div>

          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className='absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2'
          >
            <span className='text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase'>Défiler</span>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
              className='w-px h-7 rounded-full'
              style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)" }}
            />
          </motion.div>
        </section>
        <div className='flex flex-col w-full px-4 py-10'>{children}</div>
      </div>

      {/* ── Version DESKTOP : effet scroll-expansion complet ── */}
      <div
        ref={sectionRef}
        className='hidden lg:block transition-colors duration-700 ease-in-out overflow-x-hidden'
        style={{ minHeight: '100dvh' }}
      >
        <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
          <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
            <motion.div
              className='absolute inset-0 z-0 h-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 - scrollProgress }}
              transition={{ duration: 0.1 }}
            >
              <Image
                src={bgImageSrc}
                alt='Background'
                width={1920}
                height={1080}
                className='w-screen h-screen'
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              <div className='absolute inset-0 bg-black/10' />
            </motion.div>

            <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
              <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
                <div
                  className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl'
                  style={{
                    width: `${mediaWidth}px`,
                    height: `${mediaHeight}px`,
                    maxWidth: '95vw',
                    maxHeight: '85vh',
                    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {mediaType === 'video' ? (
                    mediaSrc.includes('youtube.com') ? (
                      <div className='relative w-full h-full pointer-events-none'>
                        <iframe
                          width='100%'
                          height='100%'
                          src={
                            mediaSrc.includes('embed')
                              ? mediaSrc + (mediaSrc.includes('?') ? '&' : '?') + 'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                              : mediaSrc.replace('watch?v=', 'embed/') + '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' + mediaSrc.split('v=')[1]
                          }
                          className='w-full h-full rounded-xl'
                          frameBorder='0'
                          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                          allowFullScreen
                        />
                        <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                        <motion.div className='absolute inset-0 bg-black/30 rounded-xl'
                          initial={{ opacity: 0.7 }} animate={{ opacity: 0.5 - scrollProgress * 0.3 }} transition={{ duration: 0.2 }} />
                      </div>
                    ) : (
                      <div className='relative w-full h-full pointer-events-none'>
                        <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline preload='auto'
                          className='w-full h-full object-cover rounded-xl' controls={false} disablePictureInPicture disableRemotePlayback />
                        <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                        <motion.div className='absolute inset-0 bg-black/30 rounded-xl'
                          initial={{ opacity: 0.7 }} animate={{ opacity: 0.5 - scrollProgress * 0.3 }} transition={{ duration: 0.2 }} />
                      </div>
                    )
                  ) : (
                    <div className='relative w-full h-full'>
                      <Image src={mediaSrc} alt={title || 'Media content'} fill
                        sizes='80vw' className='object-cover rounded-xl' />
                      <motion.div className='absolute inset-0 bg-black/50 rounded-xl'
                        initial={{ opacity: 0.7 }} animate={{ opacity: 0.7 - scrollProgress * 0.3 }} transition={{ duration: 0.2 }} />
                    </div>
                  )}

                  <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                    {date && (
                      <p className='text-2xl text-blue-200' style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                        {date}
                      </p>
                    )}
                    {scrollToExpand && (
                      <p className='text-blue-200 font-medium text-center' style={{ transform: `translateX(${textTranslateX}vw)` }}>
                        {scrollToExpand}
                      </p>
                    )}
                  </div>
                </div>

                <h1 className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'}`}>
                  <motion.span className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none'
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}>
                    {firstWord}
                  </motion.span>
                  <motion.span className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none'
                    style={{ transform: `translateX(${textTranslateX}vw)` }}>
                    {restOfTitle}
                  </motion.span>
                </h1>
              </div>

              <motion.section
                className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ScrollExpandMedia;

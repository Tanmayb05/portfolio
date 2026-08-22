"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { ContactLinkCard } from "@/components/cards/ContactLinkCard";
import { StaggerGroup } from "@/components/motion";
import { SiteContainer } from "@/components/shared/SiteContainer";
import { contactLinks, resume } from "@/lib/content";

const contactMethods = [
  {
    label: "Email",
    title: resume.contact.email,
    description: "Send me a direct note.",
    href: contactLinks.email
  },
  {
    label: "LinkedIn",
    title: resume.contact.linkedin,
    description: "Connect with me professionally.",
    href: contactLinks.linkedin
  },
  {
    label: "GitHub",
    title: resume.contact.github,
    description: "Browse my code and project work.",
    href: contactLinks.github
  }
];

interface Ripple {
  x: number;
  y: number;
  size: number;
  key: number;
}

export function PinnedContactSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [ripple, setRipple] = useState<Ripple | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"]
  });

  const handleImageClick = () => {
    setRipple({
      x: 0,
      y: 0,
      size: 0,
      key: Date.now()
    });
  };

  // Hero text animations (left column)
  // 1.0 from 0.00-0.20, fade to 0 from 0.20-0.45, stay 0 from 0.45-1.00
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 1],
    [1, 1, 0, 0]
  );
  const heroTextY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 1],
    [0, 0, -30, -30]
  );

  // Cards animations (left column)
  // 0 from 0.00-0.35, fade to 1 from 0.35-0.60, stay 1 from 0.60-1.00
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6, 1],
    [0, 0, 1, 1]
  );
  const cardsY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.6, 1],
    [50, 50, 0, 0]
  );

  // Hero pointer events: disable when cards are visible
  const heroPointerEvents = useTransform(heroTextOpacity, (opacity) =>
    opacity < 0.1 ? "none" : "auto"
  );

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "220vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="section-gradient-hero relative w-full h-full overflow-hidden border-b border-[var(--border-soft)]">
          <div aria-hidden="true" className="soft-grid absolute inset-0" />

          <SiteContainer className="h-full">
            <div className="h-full grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:items-center">

              {/* Left Column - Animated Content */}
              <div className="relative h-full flex flex-col justify-center">

                {/* Hero Text Layer */}
                <motion.div
                  style={{
                    opacity: heroTextOpacity,
                    y: heroTextY,
                    pointerEvents: heroPointerEvents as any
                  }}
                  className="flex flex-col z-10"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-teal)]">
                    Contact
                  </p>
                  <h1 className="mt-5 text-balance text-5xl font-semibold leading-none text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
                    Reach me directly.
                  </h1>
                </motion.div>

                {/* Contact Cards Layer */}
                <motion.div
                  style={{
                    opacity: cardsOpacity,
                    y: cardsY,
                    pointerEvents: "auto"
                  }}
                  className="absolute inset-0 flex flex-col justify-center z-20"
                >
                  <div className="w-full max-w-[760px]">
                    <StaggerGroup
                      className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                      staggerDelay={80}
                    >
                      {contactMethods.map((method) => (
                        <ContactLinkCard
                          description={method.description}
                          href={method.href}
                          key={method.label}
                          label={method.label}
                          title={method.title}
                        />
                      ))}
                    </StaggerGroup>
                  </div>
                </motion.div>

              </div>

              {/* Right Column - Static Image with Interactions */}
              <div className="hidden lg:flex justify-end items-center h-full">
                <div
                  ref={imageRef}
                  onClick={handleImageClick}
                  className="relative inline-flex group cursor-pointer select-none"
                >
                  {/* Hover Glow Background */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-500/5 blur-3xl opacity-0 group-hover:opacity-100 pointer-events-none z-0"
                    transition={{ duration: 0.5 }}
                  />

                  {/* Image with Hover Scale */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative z-10"
                  >
                    <Image
                      src="/low-poly-image-removebg.png"
                      alt="Tanmay Bhuskute"
                      width={500}
                      height={680}
                      priority
                      className="drop-shadow-2xl w-[360px] md:w-[420px] lg:w-[460px] xl:w-[500px] select-none"
                    />
                  </motion.div>

                  {/* Teal Light Sweep with Alpha Mask */}
                  {ripple && (
                    <div
                      className="pointer-events-none absolute inset-0 z-20"
                      style={{
                        WebkitMaskImage: 'url(/low-poly-image-removebg.png)',
                        maskImage: 'url(/low-poly-image-removebg.png)',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center'
                      }}
                    >
                      <motion.div
                        key={ripple.key}
                        initial={{ x: '-120%' }}
                        animate={{ x: '120%' }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        onAnimationComplete={() => setRipple(null)}
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(120deg, transparent 35%, rgba(45, 212, 191, 0.55) 50%, transparent 65%)'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

            </div>
          </SiteContainer>
        </div>
      </div>
    </div>
  );
}

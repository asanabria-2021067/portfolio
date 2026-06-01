"use client";

import { ReactNode, useEffect, useRef } from "react";
import { clsx } from "clsx";
import gsap from "gsap";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: 1 | 2 | 3;
}

export default function BentoCard({ children, className, span = 1 }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          delay: Math.random() * 0.4,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    gsap.to(card, {
      y: -5,
      scale: 1.015,
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: "0 30px 70px -25px rgba(0,0,0,0.7), 0 0 20px rgba(106,166,255,0.12)",
    });
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
      boxShadow: "0 20px 50px -25px rgba(0,0,0,0.5)",
    });
  };

  return (
    <section
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={clsx(
        "relative rounded-[var(--radius)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015)_40%,rgba(255,255,255,0.01))] border border-[var(--line)] backdrop-blur-[14px] p-[var(--pad)] transition-colors duration-250 overflow-hidden w-full shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_50px_-25px_rgba(0,0,0,0.5)] will-change-[transform,opacity,box-shadow] hover:border-[var(--line-2)]",
        span === 2 && "col-span-1 md:col-span-2",
        span === 3 && "col-span-1 md:col-span-2 lg:col-span-3",
        className
      )}
    >
      <div className="card-edge" />
      {children}
    </section>
  );
}

"use client";

import { Children, type HTMLAttributes, type ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

type StaggerGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  itemClassName?: string;
  staggerDelay?: number;
};

export function StaggerGroup({
  children,
  className = "",
  itemClassName = "",
  staggerDelay = 80,
  ...props
}: StaggerGroupProps) {
  return (
    <div className={className} {...props}>
      {Children.map(children, (child, index) => (
        <Reveal className={itemClassName} delay={index * staggerDelay}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

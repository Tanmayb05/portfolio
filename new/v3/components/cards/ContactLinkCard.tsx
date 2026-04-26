"use client";

import { useState } from "react";

type ContactLinkCardProps = {
  description: string;
  href: string;
  label: string;
  title: string;
};

const IconMap = {
  Email: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  GitHub: (
    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.544 2.914 1.186.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
};

const ArrowUpRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
  </svg>
);

const displayLinks: Record<string, string> = {
  Email: "tanmay.v.bhuskute@gmail.com",
  LinkedIn: "linkedin.com/in/tanmay-bhuskute",
  GitHub: "github.com/Tanmayb05"
};

export function ContactLinkCard({
  description,
  href,
  label,
  title
}: ContactLinkCardProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (label === "Email") {
      navigator.clipboard.writeText(title).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      window.open(href, "_blank");
    }
  };

  const isEmail = label === "Email";

  return (
    <button
      onClick={handleClick}
      className="group relative flex h-[220px] w-full min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/55 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-teal-400/35 hover:bg-slate-900/75 hover:shadow-[0_24px_80px_rgba(45,212,191,0.12)] cursor-pointer text-left"
    >
      {/* Shine overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Icon and Arrow */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 shadow-[0_0_30px_rgba(45,212,191,0.12)] transition-transform duration-300 group-hover:scale-110 text-teal-300">
            {IconMap[label as keyof typeof IconMap]}
          </div>

          <svg className="h-3 w-3 flex-shrink-0 text-slate-500 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-teal-300 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7m10 0v10" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white">
          {label}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          {description}
        </p>

        {/* Link/Email */}
        <p className="mt-auto pt-4 text-[11px] leading-relaxed text-slate-500 break-words">
          {copied && isEmail ? "Copied!" : displayLinks[label]}
        </p>

      </div>
    </button>
  );
}

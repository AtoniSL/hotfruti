import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ compact = false }) => {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      {/* Watermelon wedge emblem inspired by @bomdeprecohortifruti */}
      <svg
        width={compact ? 34 : 38}
        height={compact ? 26 : 30}
        viewBox="0 0 48 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M24 3L44 26.5C38.5 31.8 31.6 34.5 24 34.5C16.4 34.5 9.5 31.8 4 26.5L24 3Z"
          fill="#4E8C18"
        />
        <path
          d="M24 5.5L41.5 25.5C36.6 29.8 30.5 32 24 32C17.5 32 11.4 29.8 6.5 25.5L24 5.5Z"
          fill="#7CC22E"
        />
        <path
          d="M24 7.5L39.2 24.4C34.8 28 29.6 29.8 24 29.8C18.4 29.8 13.2 28 8.8 24.4L24 7.5Z"
          fill="#D92B2B"
        />
        <circle cx="24" cy="14" r="1.2" fill="#161218" />
        <circle cx="17.5" cy="22.5" r="1.1" fill="#161218" />
        <circle cx="30.5" cy="22.5" r="1.1" fill="#161218" />
        <text
          x="24"
          y="25.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Anton, sans-serif"
          fontSize="10.5"
          letterSpacing="0.04em"
        >
          DE
        </text>
      </svg>

      <span className="flex flex-col">
        <span className="font-display text-[1.1rem] sm:text-[1.3rem] leading-[1.08] tracking-[0.03em] text-[var(--color-white)] uppercase">
          Bom de Preço
        </span>
        {!compact && (
          <span className="text-[9.5px] sm:text-[11px] font-semibold leading-none tracking-[0.09em] text-[var(--color-yellow)] uppercase mt-1.5">
            HortiFruti &amp; Cia
          </span>
        )}
      </span>
    </span>
  );
};

export const BotanicalPatternOverlay: React.FC<{ opacity?: number }> = ({
  opacity = 0.08,
}) => {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="bomdepreco-fruit-pattern"
          x="0"
          y="0"
          width="160"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          {/* Watermelon slice outline */}
          <path
            d="M24 44 L44 20 L64 44 Q44 54 24 44 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Citrus wheel */}
          <circle
            cx="118"
            cy="38"
            r="16"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <circle
            cx="118"
            cy="38"
            r="4"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          <line x1="118" y1="22" x2="118" y2="54" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="102" y1="38" x2="134" y2="38" stroke="#FFFFFF" strokeWidth="1" />
          {/* Leaf sprig */}
          <path
            d="M34 128 C34 108 54 96 70 96 C70 114 54 128 34 128 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <line x1="34" y1="128" x2="62" y2="104" stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Tomato / apple silhouette */}
          <circle
            cx="124"
            cy="118"
            r="14"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <path
            d="M124 104 C124 98 130 96 133 99"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.4"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bomdepreco-fruit-pattern)" />
    </svg>
  );
};

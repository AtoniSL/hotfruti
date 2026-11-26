import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

// Emil Kowalski's signature deceleration easing (never ease-in) and crisp spring physics
export const EMIL_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export const EMIL_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.8,
};

interface KineticWordCyclerProps {
  words: string[];
  intervalMs?: number;
  className?: string;
}

export const KineticWordCycler: React.FC<KineticWordCyclerProps> = ({
  words,
  intervalMs = 3800,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced || words.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, prefersReduced, words.length]);

  if (prefersReduced) {
    return <span className={`text-shimmer-gold ${className}`}>{words[0]}</span>;
  }

  return (
    <span className="inline-grid place-items-center relative align-baseline min-h-[1.08em]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
          transition={{ duration: 0.34, ease: EMIL_EASE }}
          className={`col-start-1 row-start-1 inline-block text-shimmer-gold ${className}`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

interface RevealBlockProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export const RevealBlock: React.FC<RevealBlockProps> = ({
  children,
  delay = 0,
  className = '',
  y = 18,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, delay, ease: EMIL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'article' | 'div';
  children: React.ReactNode;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  as = 'article',
  children,
  className = '',
  onMouseMove,
  ...rest
}) => {
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--spot-x',
      `${event.clientX - rect.left}px`
    );
    event.currentTarget.style.setProperty(
      '--spot-y',
      `${event.clientY - rect.top}px`
    );
    if (onMouseMove) {
      onMouseMove(event);
    }
  };

  if (as === 'div') {
    return (
      <div
        onMouseMove={handleMouseMove}
        className={`spotlight-card ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <article
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      {...rest}
    >
      {children}
    </article>
  );
};

export const ScrollProgressBar: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="h-[2.5px] w-full bg-gradient-to-r from-[var(--color-green-lime)] via-[var(--color-yellow)] to-[var(--color-green-lime)]"
    />
  );
};

const MARQUEE_ITEMS = [
  'AMBIENTE CLIMATIZADO',
  'FRUTAS DA ESTAÇÃO',
  'LEGUMES SELECIONADOS',
  'FOLHAS HIDROPÔNICAS',
  'PLANTAS & FLORES',
  'QUARTA E SÁBADO DE OFERTAS',
  'ATENDIMENTO PELO WHATSAPP',
  'GUARAPARI · ES',
];

export const ProduceMarquee: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="marquee-wrapper overflow-hidden bg-[var(--color-purple-dark)] border-y border-white/10 py-3.5 select-none"
    >
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {MARQUEE_ITEMS.map((label) => (
              <span
                key={`${dup}-${label}`}
                className="inline-flex items-center gap-5 px-5 font-display text-[15px] sm:text-[16px] tracking-[0.12em] uppercase text-[var(--color-cream)] whitespace-nowrap"
              >
                <span>{label}</span>
                <span className="text-[var(--color-yellow)] text-xs">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

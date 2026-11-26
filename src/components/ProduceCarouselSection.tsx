import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '../data/catalog';
import { ProduceImage } from './ProduceImage';
import { RevealBlock, SpotlightCard } from './MotionPrimitives';

interface ProduceCarouselSectionProps {
  onOpenOrderDrawer: () => void;
}

const AUTO_SPEED_PX_PER_SEC = 54;

export const ProduceCarouselSection: React.FC<ProduceCarouselSectionProps> = ({
  onOpenOrderDrawer,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstGroupRef = useRef<HTMLDivElement | null>(null);

  const posRef = useRef(0);
  const halfWidthRef = useRef(0);
  const currentSpeedRef = useRef(AUTO_SPEED_PX_PER_SEC);
  const stepRemainingRef = useRef(0);
  const isTrackHoveredRef = useRef(false);

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    lastX: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  // Measure exact width of one full 12-item cycle (including trailing gap)
  useEffect(() => {
    const groupEl = firstGroupRef.current;
    if (!groupEl) return;

    const updateMeasure = () => {
      halfWidthRef.current = groupEl.offsetWidth;
    };

    updateMeasure();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateMeasure);
      ro.observe(groupEl);
      return () => ro.disconnect();
    }

    window.addEventListener('resize', updateMeasure, { passive: true });
    return () => window.removeEventListener('resize', updateMeasure);
  }, []);

  // Continuous, sub-pixel GPU-composited infinite glide loop
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const wrapPosition = (pos: number, halfWidth: number): number => {
      if (halfWidth <= 0) return 0;
      let next = pos % halfWidth;
      if (next < 0) next += halfWidth;
      return next;
    };

    const tick = (now: number) => {
      const dtMs = Math.min(64, Math.max(0, now - lastTime));
      lastTime = now;
      const dtSec = dtMs / 1000;

      const halfWidth = halfWidthRef.current;
      const trackEl = trackRef.current;

      if (trackEl && halfWidth > 0) {
        // Softly ease cruise speed down on card hover/drag and back up when released
        const targetSpeed =
          dragRef.current.active || isTrackHoveredRef.current
            ? 0
            : AUTO_SPEED_PX_PER_SEC;
        const blend = 1 - Math.exp(-dtSec * 6);
        currentSpeedRef.current +=
          (targetSpeed - currentSpeedRef.current) * blend;

        let delta = currentSpeedRef.current * dtSec;

        // Smooth manual Prev/Next button step impulse
        if (Math.abs(stepRemainingRef.current) > 0.4) {
          const stepConsume =
            stepRemainingRef.current * (1 - Math.exp(-dtSec * 10));
          delta += stepConsume;
          stepRemainingRef.current -= stepConsume;
        } else {
          stepRemainingRef.current = 0;
        }

        if (!dragRef.current.active && Math.abs(delta) > 0.0001) {
          posRef.current = wrapPosition(posRef.current + delta, halfWidth);
        }

        trackEl.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleStep = (direction: -1 | 1) => {
    const firstCard = firstGroupRef.current?.querySelector<HTMLElement>(
      '[data-carousel-card]'
    );
    const cardWidth = firstCard ? firstCard.offsetWidth : 300;
    const gap = window.innerWidth >= 640 ? 24 : 16;
    stepRemainingRef.current += (cardWidth + gap) * direction;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
    };
    stepRemainingRef.current = 0;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) {
      return;
    }
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;

    const halfWidth = halfWidthRef.current;
    if (halfWidth > 0) {
      let next = (posRef.current - dx) % halfWidth;
      if (next < 0) next += halfWidth;
      posRef.current = next;
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== e.pointerId) {
      return;
    }
    dragRef.current.active = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleStep(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleStep(1);
    }
  };

  const renderCard = (product: Product, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${product.id}`}
      data-carousel-card
      className="shrink-0 w-[74vw] max-w-[288px] sm:w-[292px] md:w-[304px] lg:w-[312px]"
    >
      <SpotlightCard
        data-testid={
          keyPrefix === 'set-0' ? `product-card-${product.id}` : undefined
        }
        className="group card-produce h-full bg-[var(--color-white)] rounded-[22px] overflow-hidden border border-[var(--color-purple)]/10 hover:border-[var(--color-yellow)]/85 flex flex-col"
      >
        {/* Full-bleed 1:1 Editorial Photography */}
        <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-cream)]">
          <ProduceImage
            src={product.image}
            alt={product.name}
            fallbackEmoji={product.emoji}
            eager
            className="h-full w-full"
            imgClassName="pointer-events-none select-none transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
          />

          {/* Subtle bottom vignette to anchor depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/14 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"
          />

          {/* Editorial floating badge only for special highlights */}
          {product.highlightNote && (
            <span className="pointer-events-none absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-purple-deep)]/85 backdrop-blur-md border border-white/15 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-yellow)] shadow-sm">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-yellow)]"
              />
              {product.highlightNote}
            </span>
          )}
        </div>

        {/* Clean Editorial Typography Footer */}
        <div className="relative z-10 p-5 sm:p-5.5 flex-1 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.11em] text-[var(--color-green)]">
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-lime)]"
              />
              <span>{product.category}</span>
            </div>

            <h3 className="mt-1.5 text-[17.5px] sm:text-[18.5px] font-bold leading-[1.26] tracking-[-0.01em] text-[var(--color-purple-dark)] group-hover:text-[var(--color-purple)] transition-colors duration-150">
              {product.name}
            </h3>

            <p className="mt-1.5 text-[14px] leading-[1.52] text-[var(--color-black)]/70">
              {product.description}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );

  return (
    <section
      id="catalogo"
      aria-labelledby="vitrine-heading"
      className="relative overflow-hidden bg-[var(--color-cream)] py-16 sm:py-24"
    >
      {/* Subtle organic botanical top wave accent */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 w-full h-12 sm:h-16 opacity-18"
      >
        <path
          d="M-20 36 C260 92, 580 8, 900 48 C1140 78, 1310 22, 1460 40"
          fill="none"
          stroke="#7CC22E"
          strokeWidth="18"
          strokeLinecap="round"
        />
      </svg>

      {/* Ambient warm backdrop glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-0 w-[480px] h-[480px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 194, 26, 0.22) 0%, rgba(124, 194, 46, 0.1) 45%, transparent 72%)',
        }}
      />

      {/* Editorial Header + Prev/Next Controls (No Filter Tabs) */}
      <div className="container-site relative z-10">
        <RevealBlock className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
          <div className="max-w-[620px]">
            <p className="inline-flex items-center gap-2 text-[12.5px] sm:text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-green)] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Loja 100% climatizada · Seleção diária</span>
            </p>

            <h2
              id="vitrine-heading"
              className="font-display uppercase text-[clamp(2.15rem,4vw,3.45rem)] leading-[1.03] text-[var(--color-purple-dark)] [text-wrap:balance]"
            >
              NOSSA VITRINE{' '}
              <span className="text-[var(--color-green)]">FRESQUINHA</span>
            </h2>

            <p className="mt-3 text-[15.5px] sm:text-[16.5px] leading-[1.6] text-[var(--color-black)]/75 max-w-[54ch]">
              Frutas docinhas no ponto certo, legumes firmes, folhas
              hidropônicas e flores cuidadas em ambiente climatizado para durar
              muito mais na sua casa.
            </p>
          </div>

          {/* Optional tactile Prev/Next step buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label="Voltar um produto"
              className="btn-lift w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--color-white)] border border-[var(--color-purple)]/15 text-[var(--color-purple-dark)] hover:bg-[var(--color-purple-dark)] hover:text-[var(--color-white)] hover:border-[var(--color-purple-dark)] inline-flex items-center justify-center shadow-[var(--shadow-sm)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-purple-dark)]"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label="Avançar um produto"
              className="btn-lift w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--color-purple-dark)] border border-[var(--color-purple-dark)] text-[var(--color-white)] hover:bg-[var(--color-green)] hover:border-[var(--color-green)] inline-flex items-center justify-center shadow-[var(--shadow-sm)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-purple-dark)]"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </RevealBlock>
      </div>

      {/* Infinite Auto-Gliding Showcase Viewport with soft edge fades */}
      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label="Vitrine ilustrativa de produtos do hortifruti"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => {
          isTrackHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isTrackHoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        data-testid="produce-carousel-track"
        className={`carousel-edge-fade relative z-10 mt-8 sm:mt-10 overflow-hidden py-3 touch-pan-y select-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-purple)] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div
          ref={trackRef}
          className="flex w-max will-change-transform pl-4 sm:pl-6 lg:pl-8"
        >
          {/* Cycle A (Measured primary set) */}
          <div
            ref={firstGroupRef}
            className="flex gap-4 sm:gap-6 pr-4 sm:gap-6 sm:pr-6 shrink-0"
          >
            {PRODUCTS.map((product) => renderCard(product, 'set-0'))}
          </div>

          {/* Cycle B (Seamless loop clone) */}
          <div
            aria-hidden="true"
            className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0"
          >
            {PRODUCTS.map((product) => renderCard(product, 'set-1'))}
          </div>
        </div>
      </div>

      {/* Subtle Contextual WhatsApp Prompt */}
      <div className="container-site relative z-10 mt-5 sm:mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-[13px] text-[var(--color-black)]/60">
          Passe o mouse sobre um produto para pausar ou arraste para navegar no seu ritmo.
        </p>

        <button
          type="button"
          onClick={onOpenOrderDrawer}
          className="group inline-flex items-center gap-2 self-start sm:self-auto text-[14px] font-bold text-[var(--color-purple-dark)] hover:text-[var(--color-green)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-purple)] rounded-[var(--radius-sm)]"
        >
          <MessageCircle
            className="w-4 h-4 text-[var(--color-green)] shrink-0 transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          />
          <span>Consultar variedade de hoje no WhatsApp</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
};

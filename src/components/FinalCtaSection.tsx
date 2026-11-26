import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { EDITORIAL_IMAGES, STORE_INFO } from '../data/catalog';
import { RevealBlock } from './MotionPrimitives';

interface FinalCtaSectionProps {
  onOpenOrderDrawer: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenOrderDrawer,
}) => {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[var(--color-purple-deep)] text-[var(--color-white)] py-20 sm:py-24"
    >
      {/* Full-bleed dark-produce editorial photograph */}
      <img
        src={EDITORIAL_IMAGES.bannerBackdrop}
        alt="Uvas roxas, pimentões, repolho roxo, maçãs verdes e folhas frescas do hortifruti"
        loading="lazy"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Measured rich deep purple contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(26, 10, 32, 0.88) 0%, rgba(59, 18, 71, 0.8) 55%, rgba(26, 10, 32, 0.9) 100%)',
        }}
      />

      <RevealBlock className="container-site relative z-10 text-center flex flex-col items-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--color-yellow)] mb-3">
          Quarta e Sábado de ofertas
          <span className="hidden sm:inline"> · Guarapari, ES</span>
        </p>

        <h2 className="font-display uppercase text-[clamp(2.35rem,5vw,4.25rem)] leading-[1.15] max-w-[16ch] [text-wrap:balance]">
          ESTAMOS AQUI PARA{' '}
          <span className="text-shimmer-gold">ATENDÊ-LO</span>
        </h2>

        <p className="mt-4 text-[16px] sm:text-[18px] leading-[1.65] text-[var(--color-cream)]/92 max-w-[56ch]">
          Envie sua lista para retirar na loja climatizada, peça entrega em
          Guarapari ou consulte as ofertas fresquinhas de quarta e sábado.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <button
            type="button"
            onClick={onOpenOrderDrawer}
            className="btn-lift btn-shine btn-shine-ambient inline-flex items-center justify-center gap-2.5 min-h-[54px] px-8 bg-[var(--color-yellow)] text-[var(--color-black)] font-bold text-[16px] rounded-[var(--radius-md)] shadow-lg hover:brightness-95 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Pedir no WhatsApp</span>
          </button>
        </div>

        <p className="mt-8 pt-6 border-t border-white/15 inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-[13.5px] text-[var(--color-cream)]/90">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[var(--color-yellow)] shrink-0" aria-hidden="true" />
            {STORE_INFO.address}
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-[var(--color-yellow)]">·</span>
          <span className="w-full sm:w-auto">
            {STORE_INFO.hoursWeek} · {STORE_INFO.hoursSunday}
          </span>
        </p>
      </RevealBlock>
    </section>
  );
};

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { EDITORIAL_IMAGES, STORE_INFO } from '../data/catalog';
import {
  EMIL_EASE,
  KineticWordCycler,
  ProduceMarquee,
} from './MotionPrimitives';

const HERO_KINETIC_WORDS = [
  'FRESCOR TODO DIA',
  'QUALIDADE NA SUA MESA',
  'ESCOLHA NO PONTO CERTO',
  'CARINHO EM CADA FRUTA',
];

export const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <section
        id="inicio"
        className="relative overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center justify-center bg-[var(--color-purple-deep)] text-[var(--color-white)]"
      >
        {/* Full-bleed abundant overhead produce photography */}
        <img
          src={EDITORIAL_IMAGES.heroBackdrop}
          alt="Mesa abundante com frutas, legumes e verduras fresquinhos do Bom de Preço HortiFruti"
          loading="eager"
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.02]"
        />

        {/* Measured dramatic radial & vertical contrast scrim preserving vibrant produce edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 68% 72% at 50% 50%, rgba(26, 10, 32, 0.84) 0%, rgba(59, 18, 71, 0.62) 55%, rgba(26, 10, 32, 0.72) 100%)',
          }}
        />

        {/* Subtle warm golden top-center specular highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 194, 26, 0.7) 0%, transparent 70%)',
          }}
        />

        <div className="container-site relative z-10 py-16 sm:py-20 lg:py-24">
          <div className="max-w-[780px] mx-auto text-center flex flex-col items-center">
            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.42, ease: EMIL_EASE }}
              className="font-display uppercase text-[clamp(2.8rem,6.4vw,5.15rem)] leading-[1.03] text-[var(--color-white)] [text-wrap:balance]"
            >
              SABOR E{' '}
              <span className="block mt-1">
                <KineticWordCycler words={HERO_KINETIC_WORDS} />
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.14, ease: EMIL_EASE }}
              className="mt-5 text-[16px] sm:text-[18.5px] leading-[1.6] text-[var(--color-cream)] max-w-[54ch]"
            >
              No Bom de Preço HortiFruti &amp; Cia, frutas, legumes, folhas
              hidropônicas e flores são cuidados em ambiente climatizado para
              levar muito mais frescor à sua mesa.
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.2, ease: EMIL_EASE }}
              className="mt-8 flex items-center justify-center"
            >
              <a
                href="#catalogo"
                className="btn-lift btn-shine btn-shine-ambient inline-flex items-center justify-center gap-2 min-h-[50px] px-8 bg-[var(--color-yellow)] text-[var(--color-black)] font-bold text-[15.5px] rounded-[var(--radius-md)] shadow-lg hover:brightness-95 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
              >
                <span>Explorar opções</span>
                <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.28, ease: EMIL_EASE }}
              className="mt-9 pt-5 border-t border-white/20 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[13px] sm:text-[14px] text-[var(--color-cream)]/90"
            >
              <span>❄️ Loja climatizada</span>
              <span aria-hidden="true" className="text-[var(--color-yellow)]">·</span>
              <span>Quarta e Sábado de ofertas</span>
              <span aria-hidden="true" className="hidden sm:inline text-[var(--color-yellow)]">·</span>
              <span className="w-full sm:w-auto">{STORE_INFO.address}</span>
            </motion.div>
          </div>
        </div>
      </section>

      <ProduceMarquee />
    </>
  );
};

import React from 'react';
import { Check, MapPin } from 'lucide-react';
import {
  ABOUT_DIFFERENTIALS,
  EDITORIAL_IMAGES,
  STORE_INFO,
} from '../data/catalog';
import { ProduceImage } from './ProduceImage';
import { RevealBlock } from './MotionPrimitives';

export const AboutSection: React.FC = () => {
  return (
    <section id="quem-somos" className="bg-[var(--color-white)] py-16 sm:py-24 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Brand Story & Differentials */}
          <RevealBlock className="lg:col-span-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-green)] mb-2.5">
              Nossa essência em Guarapari
            </p>

            <h2 className="font-display uppercase text-[clamp(2.15rem,4vw,3.4rem)] leading-[1.04] text-[var(--color-purple-dark)] [text-wrap:balance]">
              QUEM SOMOS NO{' '}
              <span className="text-[var(--color-green)]">BOM DE PREÇO</span>
            </h2>

            <p className="mt-5 text-[16px] leading-[1.7] text-[var(--color-black)]/80">
              No Bom de Preço HortiFruti &amp; Cia, somos apaixonados por levar
              o melhor da natureza para a sua mesa com carinho e cuidado real.
              Nossa loja em Guarapari conta com ambiente climatizado para manter
              frutas, legumes, folhas e flores sempre viçosos, saborosos e
              prontos para durar muito mais na sua casa.
            </p>

            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ABOUT_DIFFERENTIALS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[15px] font-medium text-[var(--color-black)]"
                >
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 rounded-full bg-[var(--color-green)]/14 text-[var(--color-green)] flex items-center justify-center shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealBlock>

          {/* Right Column: Warm Editorial Lifestyle Portrait */}
          <RevealBlock delay={0.08} className="lg:col-span-6">
            <div className="relative">
              {/* Subtle decorative warm green & yellow backdrop accent */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[26px] bg-gradient-to-tr from-[var(--color-purple)]/12 via-[var(--color-green-lime)]/16 to-[var(--color-yellow)]/20 blur-xl"
              />

              <div className="relative rounded-[20px] overflow-hidden border border-[var(--color-purple)]/12 shadow-[var(--shadow-lg)]">
                <ProduceImage
                  src={EDITORIAL_IMAGES.quemSomos}
                  alt="Atendimento acolhedor com caixa repleta de frutas, legumes e verduras frescas no Bom de Preço"
                  fallbackEmoji="🧺"
                  className="aspect-[4/3] w-full"
                />

                {/* Clean bottom-left scrim caption */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[var(--color-purple-deep)]/85 backdrop-blur-md text-[var(--color-white)] px-4 py-3 rounded-[var(--radius-md)] border border-white/15 flex items-center gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-[var(--color-yellow)] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] font-semibold leading-snug">
                    {STORE_INFO.address}
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
};

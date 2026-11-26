import React from 'react';
import { DELIVERY_STEPS, EDITORIAL_IMAGES } from '../data/catalog';
import { ProduceImage } from './ProduceImage';
import { RevealBlock } from './MotionPrimitives';

export const DeliverySection: React.FC = () => {
  return (
    <section id="delivery" className="bg-[var(--color-white)] py-16 sm:py-24 overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Curated Delivery Box Editorial Photograph */}
          <RevealBlock className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[26px] bg-gradient-to-br from-[var(--color-green-lime)]/20 via-[var(--color-yellow)]/18 to-[var(--color-purple)]/12 blur-xl"
              />
              <div className="relative rounded-[20px] overflow-hidden border border-[var(--color-purple)]/12 shadow-[var(--shadow-lg)]">
                <ProduceImage
                  src={EDITORIAL_IMAGES.deliveryBox}
                  alt="Caixa de hortifruti fresco preparada com frutas, legumes e verduras para entrega em Guarapari"
                  fallbackEmoji="📦"
                  className="aspect-[4/3] w-full"
                />
              </div>
            </div>
          </RevealBlock>

          {/* Right Column: Fast WhatsApp Ordering & Delivery Copy */}
          <RevealBlock delay={0.08} className="lg:col-span-6 order-1 lg:order-2">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-green)] mb-2.5">
              Praticidade em Guarapari
            </p>

            <h2 className="font-display uppercase text-[clamp(2.15rem,4vw,3.4rem)] leading-[1.04] text-[var(--color-purple-dark)] [text-wrap:balance]">
              RAPIDEZ E QUALIDADE{' '}
              <span className="text-[var(--color-green)]">NA SUA PORTA</span>
            </h2>

            <p className="mt-4 text-[16px] leading-[1.7] text-[var(--color-black)]/80">
              Não sacrifique a qualidade pela conveniência. Inspire-se na nossa
              vitrine de frutas, legumes e verduras e fale direto com a gente no
              WhatsApp: nossa equipe escolhe tudo fresquinho no ponto certo para
              você retirar na loja ou receber em casa.
            </p>

            <ol className="mt-7 space-y-4">
              {DELIVERY_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="flex items-start gap-4 p-3.5 rounded-[var(--radius-md)] bg-[var(--color-cream-soft)] border border-[var(--color-purple)]/10"
                >
                  <span className="font-display text-[1.45rem] leading-none text-[var(--color-purple)] pt-0.5 shrink-0 tabular-nums">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-[var(--color-black)] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[14px] text-[var(--color-black)]/72 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
};

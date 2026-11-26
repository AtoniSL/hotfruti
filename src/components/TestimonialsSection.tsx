import React from 'react';
import { TESTIMONIALS } from '../data/catalog';
import { RevealBlock, SpotlightCard } from './MotionPrimitives';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="avaliacoes"
      className="bg-[var(--color-cream)] py-16 sm:py-22 border-t border-[var(--color-purple)]/8"
    >
      <div className="container-site">
        <RevealBlock className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--color-green)] mb-2">
              Confiança de quem compra toda semana
            </p>
            <h2 className="font-display uppercase text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.05] text-[var(--color-purple-dark)] [text-wrap:balance]">
              QUEM COMPRA NO BOM DE PREÇO RECOMENDA
            </h2>
          </div>

          <p className="text-[15px] text-[var(--color-black)]/72 max-w-[42ch] leading-[1.6]">
            Frescor de loja climatizada, atendimento atencioso e seleção
            caprichada nas quartas e sábados em Guarapari.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <RevealBlock key={item.id} delay={idx * 0.08} className="h-full">
              <SpotlightCard className="h-full card-produce bg-[var(--color-white)] rounded-[var(--radius-lg)] p-6 sm:p-7 flex flex-col justify-between border border-[var(--color-purple)]/10">
                <div>
                  <div
                    className="text-[1.15rem] tracking-[0.12em] text-[var(--color-yellow)] mb-4"
                    aria-label={`${item.rating} de 5 estrelas`}
                  >
                    {'★'.repeat(item.rating)}
                  </div>

                  <blockquote className="text-[15.5px] leading-[1.65] text-[var(--color-black)]">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-purple)]/10 flex items-center gap-3.5">
                  <div
                    aria-hidden="true"
                    className="w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-bold text-[var(--color-white)] shrink-0 shadow-sm"
                    style={{ backgroundColor: item.avatarBg }}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-[var(--color-black)] leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[13px] text-[var(--color-black)]/65 mt-0.5">
                      {item.context}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};

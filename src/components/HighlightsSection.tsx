import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryFilter, PRODUCE_IMAGES } from '../data/catalog';
import { ProduceImage } from './ProduceImage';
import { RevealBlock, SpotlightCard } from './MotionPrimitives';

interface HighlightsSectionProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

const DEPARTMENT_CARDS: {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  targetCategory: CategoryFilter;
  image: string;
  emoji: string;
  kicker: string;
}[] = [
  {
    id: 'dept-frutas',
    title: 'Frutas',
    kicker: 'Seleção da safra',
    description:
      'Explore nossa seleção de frutas frescas e docinhas, escolhidas no ponto certo direto de produtores selecionados.',
    ctaLabel: 'Ver frutas fresquinhas',
    targetCategory: 'Frutas',
    image: PRODUCE_IMAGES.melancia,
    emoji: '🍉',
  },
  {
    id: 'dept-legumes',
    title: 'Legumes',
    kicker: 'Colhidos no auge',
    description:
      'Legumes firmes, saborosos e mantidos em ambiente climatizado para garantir cor viva e nutrição todos os dias.',
    ctaLabel: 'Ver legumes selecionados',
    targetCategory: 'Legumes',
    image: PRODUCE_IMAGES.tomate,
    emoji: '🍅',
  },
  {
    id: 'dept-verduras',
    title: 'Folhas & Verduras',
    kicker: 'Colhidas no dia',
    description:
      'Alfaces hidropônicas crocantes, couve manteiga macia e verduras frescas que duram muito mais na sua geladeira.',
    ctaLabel: 'Ver folhas e verduras',
    targetCategory: 'Folhas & Verduras',
    image: PRODUCE_IMAGES.alface,
    emoji: '🥬',
  },
];

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  onSelectCategory,
}) => {
  const handleCardClick = (category: CategoryFilter) => {
    onSelectCategory(category);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="destaques"
      className="relative overflow-hidden bg-[var(--color-cream)] py-16 sm:py-20"
    >
      {/* Decorative organic green brushstroke SVG */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 w-full h-14 sm:h-20 opacity-20"
      >
        <path
          d="M-20 42 C240 112, 560 4, 880 56 C1120 94, 1300 26, 1460 48"
          fill="none"
          stroke="#7CC22E"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M-10 66 C280 122, 620 26, 940 72 C1160 102, 1320 44, 1455 62"
          fill="none"
          stroke="#4E8C18"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {DEPARTMENT_CARDS.map((card, idx) => (
            <RevealBlock key={card.id} delay={idx * 0.06}>
              <SpotlightCard className="group card-produce h-full bg-[var(--color-cream-soft)] rounded-[var(--radius-lg)] p-7 sm:p-8 flex flex-col items-center text-center justify-between border border-[var(--color-purple)]/12 hover:border-[var(--color-yellow)]/75">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative mb-5">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[var(--color-yellow)]/35 via-[var(--color-green-lime)]/25 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                    />
                    <ProduceImage
                      src={card.image}
                      alt={card.title}
                      fallbackEmoji={card.emoji}
                      className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[var(--color-green-lime)]/40 shadow-sm"
                      imgClassName="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-108"
                    />
                  </div>

                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--color-green)]">
                    {card.kicker}
                  </span>

                  <h2 className="mt-1.5 font-display uppercase text-[2rem] leading-[1.08] text-[var(--color-purple-dark)]">
                    {card.title}
                  </h2>

                  <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-black)]/75 max-w-[30ch]">
                    {card.description}
                  </p>
                </div>

                <div className="relative z-10 mt-7 w-full">
                  <button
                    type="button"
                    onClick={() => handleCardClick(card.targetCategory)}
                    className="btn-lift btn-shine w-full min-h-[46px] px-5 bg-[var(--color-purple-dark)] hover:bg-[var(--color-green)] text-[var(--color-white)] font-bold text-[14px] rounded-[var(--radius-md)] inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-purple-dark)]"
                  >
                    <span>{card.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              </SpotlightCard>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import {
  CATEGORY_FILTERS,
  CategoryFilter,
  Product,
} from '../data/catalog';
import { OrderItem } from '../utils/order';
import { ProduceImage } from './ProduceImage';
import {
  EMIL_EASE,
  EMIL_SPRING,
  RevealBlock,
  SpotlightCard,
} from './MotionPrimitives';

interface CatalogSectionProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  products: Product[];
  orderItems: OrderItem[];
  onAddItem: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onOpenOrderDrawer: () => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  activeCategory,
  onSelectCategory,
  products,
  orderItems,
  onAddItem,
  onUpdateQuantity,
  onOpenOrderDrawer,
}) => {
  const prefersReduced = useReducedMotion();

  const getQuantity = (productId: string): number => {
    const found = orderItems.find((entry) => entry.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <section
      id="catalogo"
      className="bg-[var(--color-cream-soft)] border-t border-[var(--color-purple)]/8 py-16 sm:py-24"
    >
      <div className="container-site">
        <RevealBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
          <div className="max-w-[640px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--color-green)] mb-2">
              Variedade fresca selecionada em loja climatizada
            </p>
            <h2 className="font-display uppercase text-[clamp(2.1rem,3.8vw,3.3rem)] leading-[1.04] text-[var(--color-purple-dark)] [text-wrap:balance]">
              NOSSAS OPÇÕES FRESQUINHAS
            </h2>
            <p className="mt-2.5 text-[15px] leading-[1.55] text-[var(--color-black)]/72">
              Toque nas opções para montar sua lista sem compromisso e envie no
              WhatsApp para retirar na loja ou receber em casa.
            </p>
          </div>

          <p
            data-testid="catalog-count"
            className="text-[14px] font-medium text-[var(--color-black)]/70 tabular-nums shrink-0"
          >
            Mostrando <strong className="text-[var(--color-purple-dark)]">{products.length}</strong>{' '}
            {products.length === 1 ? 'opção fresquinha' : 'opções fresquinhas'}
            {activeCategory !== 'Todos' ? ` em ${activeCategory}` : ''}
          </p>
        </RevealBlock>

        {/* Shared-element spring-gliding Category Filter Bar (Emil Kowalski craft) */}
        <div
          role="group"
          aria-label="Filtrar produtos por categoria"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[var(--color-white)] rounded-[14px] border border-[var(--color-purple)]/10 shadow-[var(--shadow-sm)] mb-9 sm:mb-11"
        >
          {CATEGORY_FILTERS.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelectCategory(category)}
                className={`relative min-h-[44px] px-4 sm:px-5 rounded-[var(--radius-md)] text-[14px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-purple)] ${
                  isActive
                    ? 'text-[var(--color-white)]'
                    : 'text-[var(--color-black)]/80 hover:text-[var(--color-purple-dark)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-catalog-tab"
                    transition={prefersReduced ? { duration: 0 } : EMIL_SPRING}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[var(--radius-md)] bg-[var(--color-purple-dark)] shadow-sm"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Product Grid: Desktop 4 cols | Tablet 2 cols | Mobile 2 cols */}
        <motion.div
          layout={!prefersReduced}
          data-testid="catalog-grid"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {products.map((product) => {
              const qty = getQuantity(product.id);
              return (
                <motion.div
                  key={product.id}
                  layout={!prefersReduced}
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, y: 12, scale: 0.97 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.96 }
                  }
                  transition={{ duration: 0.24, ease: EMIL_EASE }}
                  className="h-full"
                >
                  <SpotlightCard
                    data-testid={`product-card-${product.id}`}
                    className="group card-produce h-full bg-[var(--color-white)] rounded-[var(--radius-lg)] p-3.5 sm:p-5 flex flex-col justify-between border border-[var(--color-purple)]/10 hover:border-[var(--color-yellow)]/80"
                  >
                    <div className="relative z-10">
                      {/* Circular Photographic Produce Display with warm glow ring */}
                      <div className="flex justify-center pt-1 pb-3.5 sm:pb-4">
                        <div className="relative">
                          <div
                            aria-hidden="true"
                            className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[var(--color-yellow)]/35 via-[var(--color-green-lime)]/25 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"
                          />
                          <ProduceImage
                            src={product.image}
                            alt={product.name}
                            fallbackEmoji={product.emoji}
                            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[var(--color-green-lime)]/35 shadow-sm"
                            imgClassName="transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-108"
                          />
                        </div>
                      </div>

                      {/* Clean unboxed category & note metadata */}
                      <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] sm:text-[12px] font-semibold text-[var(--color-green)]">
                        <span>{product.category}</span>
                        {product.highlightNote && (
                          <>
                            <span aria-hidden="true" className="text-[var(--color-black)]/35">·</span>
                            <span className="text-[var(--color-red)]">
                              {product.highlightNote}
                            </span>
                          </>
                        )}
                      </div>

                      <h3 className="mt-1.5 text-[15px] sm:text-[16px] font-bold leading-[1.3] text-[var(--color-black)] group-hover:text-[var(--color-purple-dark)] transition-colors duration-150">
                        {product.name}
                      </h3>

                      <p className="mt-1.5 text-[13px] sm:text-[14px] leading-[1.45] text-[var(--color-black)]/72">
                        {product.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-5 pt-3.5 border-t border-[var(--color-purple)]/10">
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => onAddItem(product)}
                          aria-label={`Adicionar ${product.name} à lista`}
                          className="btn-lift btn-shine w-full min-h-[44px] px-2.5 sm:px-3 bg-[var(--color-green)] hover:bg-[var(--color-purple-dark)] text-[var(--color-white)] font-bold text-[12.5px] sm:text-[14px] rounded-[var(--radius-md)] inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]"
                        >
                          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span className="sm:hidden">Na lista</span>
                          <span className="hidden sm:inline">Adicionar à lista</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between gap-1 bg-[var(--color-purple-dark)] text-[var(--color-white)] rounded-[var(--radius-md)] p-1 min-h-[44px] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            aria-label={`Diminuir quantidade de ${product.name}`}
                            className="w-8 h-9 sm:w-9 sm:h-9 shrink-0 rounded-[var(--radius-sm)] bg-white/15 hover:bg-white/25 inline-flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
                          >
                            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                          </button>

                          <button
                            type="button"
                            onClick={onOpenOrderDrawer}
                            aria-label={`${qty} de ${product.name} na lista, abrir resumo do pedido`}
                            className="min-w-0 flex-1 text-center text-[12px] sm:text-[13px] font-bold tabular-nums px-0.5 hover:text-[var(--color-yellow)] cursor-pointer truncate"
                          >
                            <span className="sm:hidden">{qty}x</span>
                            <span className="hidden sm:inline">{qty} na lista</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            aria-label={`Aumentar quantidade de ${product.name}`}
                            className="w-8 h-9 sm:w-9 sm:h-9 shrink-0 rounded-[var(--radius-sm)] bg-[var(--color-yellow)] text-[var(--color-black)] hover:brightness-95 inline-flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-white)]"
                          >
                            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { EMIL_SPRING } from './MotionPrimitives';

interface FloatingListBarProps {
  itemCount: number;
  isDrawerOpen: boolean;
  onOpenOrderDrawer: () => void;
}

export const FloatingListBar: React.FC<FloatingListBarProps> = ({
  itemCount,
  isDrawerOpen,
  onOpenOrderDrawer,
}) => {
  const prefersReduced = useReducedMotion();
  const isVisible = itemCount > 0 && !isDrawerOpen;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label="Resumo rápido da sua lista de pedido"
          data-testid="floating-list-bar"
          initial={prefersReduced ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          transition={prefersReduced ? { duration: 0.15 } : EMIL_SPRING}
          className="fixed bottom-4 sm:bottom-6 inset-x-0 z-30 pointer-events-none px-4"
        >
          <div
            className="pointer-events-auto max-w-[540px] mx-auto bg-[var(--color-purple-deep)]/95 backdrop-blur-md border border-[var(--color-yellow)]/35 text-[var(--color-white)] rounded-[14px] p-2.5 pl-4 flex items-center justify-between gap-3"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-purple)] text-[var(--color-yellow)] inline-flex items-center justify-center shrink-0"
              >
                <ClipboardList className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] sm:text-[14px] font-bold leading-tight truncate tabular-nums">
                  {itemCount} {itemCount === 1 ? 'item na sua lista' : 'itens na sua lista'}
                </p>
                <p className="text-[11.5px] sm:text-[12px] text-[var(--color-cream)]/75 truncate">
                  <span className="sm:hidden">Finalize no WhatsApp</span>
                  <span className="hidden sm:inline">Sem compromisso · finalize no WhatsApp</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenOrderDrawer}
              className="btn-lift btn-shine shrink-0 min-h-[44px] px-4 sm:px-5 bg-[var(--color-yellow)] text-[var(--color-black)] font-bold text-[13px] sm:text-[14px] rounded-[var(--radius-md)] inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
            >
              <span>Enviar lista</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

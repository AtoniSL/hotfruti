import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { EMIL_EASE, ScrollProgressBar } from './MotionPrimitives';

interface HeaderProps {
  itemCount: number;
  onOpenOrderDrawer: () => void;
}

const NAV_LINKS = [
  { href: '#catalogo', label: 'Opções' },
  { href: '#delivery', label: 'Delivery' },
  { href: '#quem-somos', label: 'Quem Somos' },
  { href: '#contato', label: 'Contato' },
];

export const Header: React.FC<HeaderProps> = ({ itemCount, onOpenOrderDrawer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-purple-dark)]/92 backdrop-blur-md border-b border-white/10">
      <div className="container-site h-[64px] md:h-[72px] flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#inicio"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-yellow)] rounded-[var(--radius-sm)] shrink-0"
          aria-label="Bom de Preço - HortiFruti & Cia, voltar ao topo"
        >
          <BrandLogo />
        </a>

        {/* Zone 2: Clean single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-[var(--color-cream)]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative whitespace-nowrap shrink-0 py-1 hover:text-[var(--color-yellow)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-yellow)] rounded-[var(--radius-sm)]"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[var(--color-yellow)] scale-x-0 origin-left transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenOrderDrawer}
            aria-label={
              itemCount > 0
                ? `Pedir no WhatsApp (${itemCount})`
                : 'Pedir no WhatsApp'
            }
            className="btn-lift btn-shine inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[44px] px-3 sm:px-5 bg-[var(--color-yellow)] text-[var(--color-black)] font-bold text-[13px] sm:text-sm rounded-[var(--radius-md)] hover:brightness-95 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-white)]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">
              {itemCount > 0 ? `WhatsApp (${itemCount})` : 'WhatsApp'}
            </span>
            <span className="hidden sm:inline">
              {itemCount > 0 ? `Pedir no WhatsApp (${itemCount})` : 'Pedir no WhatsApp'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[var(--color-white)] rounded-[var(--radius-md)] border border-white/15 hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)] shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu with Emil deceleration easing */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-menu"
            aria-label="Menu mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EMIL_EASE }}
            className="md:hidden bg-[var(--color-purple-deep)] border-t border-white/10"
          >
            <div className="container-site py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center px-2 text-base font-medium text-[var(--color-cream)] hover:text-[var(--color-yellow)] rounded-[var(--radius-sm)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <ScrollProgressBar />
    </header>
  );
};

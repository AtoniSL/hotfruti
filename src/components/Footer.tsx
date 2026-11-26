import React from 'react';
import { Clock, Instagram, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-purple-dark)] text-[var(--color-cream)] border-t border-white/10">
      <div className="container-site py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Slogan */}
          <div className="md:col-span-5">
            <BrandLogo />
            <p className="mt-4 text-[14.5px] leading-[1.6] text-[var(--color-cream)]/82 max-w-[38ch]">
              {STORE_INFO.slogan}
            </p>
            <p className="mt-3 text-[13px] text-[var(--color-cream)]/70">
              Frutas · Legumes · Folhas e Verduras · Plantas e Flores · Ofertas
              de Quarta e Sábado
            </p>
          </div>

          {/* Column 2: Address & Opening Hours */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="font-display uppercase text-[1.15rem] tracking-[0.04em] text-[var(--color-yellow)]">
              Visite nossa loja
            </h2>
            <div className="space-y-3 text-[14.5px] text-[var(--color-cream)]/88">
              <p className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 mt-1 text-[var(--color-green-lime)] shrink-0"
                  aria-hidden="true"
                />
                <span>{STORE_INFO.address}</span>
              </p>
              <div className="flex items-start gap-2.5">
                <Clock
                  className="w-4 h-4 mt-1 text-[var(--color-green-lime)] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p>{STORE_INFO.hoursWeek}</p>
                  <p>{STORE_INFO.hoursSunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Social */}
          <div className="md:col-span-3 flex flex-col items-start gap-3">
            <h2 className="font-display uppercase text-[1.15rem] tracking-[0.04em] text-[var(--color-yellow)]">
              Acompanhe
            </h2>

            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] text-[14.5px] font-medium text-[var(--color-cream)] hover:text-[var(--color-yellow)] transition-colors"
            >
              <Instagram className="w-4 h-4 shrink-0 text-[var(--color-green-lime)]" aria-hidden="true" />
              <span>{STORE_INFO.instagramHandle}</span>
            </a>

            <p className="text-[13.5px] leading-[1.55] text-[var(--color-cream)]/72 max-w-[26ch]">
              Novidades fresquinhas do dia e destaques de quarta e sábado no
              nosso perfil.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-[var(--color-cream)]/68">
          <p>
            © {new Date().getFullYear()} {STORE_INFO.brandName} -{' '}
            {STORE_INFO.brandSub}. Todos os direitos reservados.
          </p>
          <p>Ambiente climatizado em Guarapari, ES</p>
        </div>
      </div>
    </footer>
  );
};

import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProduceCarouselSection } from './components/ProduceCarouselSection';
import { DeliverySection } from './components/DeliverySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-cream)] text-[var(--color-black)]">
      <Header onOpenOrderDrawer={() => setIsDrawerOpen(true)} />

      <main className="flex-1">
        <Hero />

        <ProduceCarouselSection
          onOpenOrderDrawer={() => setIsDrawerOpen(true)}
        />

        <DeliverySection />

        <TestimonialsSection />

        <AboutSection />

        <FinalCtaSection onOpenOrderDrawer={() => setIsDrawerOpen(true)} />
      </main>

      <Footer />

      <WhatsAppOrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

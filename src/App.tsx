import { useMemo, useState } from 'react';
import {
  CategoryFilter,
  Product,
  PRODUCTS,
} from './data/catalog';
import {
  addItemToOrder,
  filterProductsByCategory,
  getTotalItemCount,
  OrderItem,
  removeItemFromOrder,
  updateItemQuantity,
} from './utils/order';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HighlightsSection } from './components/HighlightsSection';
import { CatalogSection } from './components/CatalogSection';
import { DeliverySection } from './components/DeliverySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { FloatingListBar } from './components/FloatingListBar';
import { WhatsAppOrderDrawer } from './components/WhatsAppOrderDrawer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Todos');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterProductsByCategory(PRODUCTS, activeCategory),
    [activeCategory]
  );

  const totalItemCount = useMemo(
    () => getTotalItemCount(orderItems),
    [orderItems]
  );

  const handleAddItem = (product: Product) => {
    setOrderItems((prev) => addItemToOrder(prev, product));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setOrderItems((prev) => updateItemQuantity(prev, productId, delta));
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) => removeItemFromOrder(prev, productId));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-cream)] text-[var(--color-black)]">
      <Header
        itemCount={totalItemCount}
        onOpenOrderDrawer={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1">
        <Hero />

        <HighlightsSection onSelectCategory={setActiveCategory} />

        <CatalogSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          products={filteredProducts}
          orderItems={orderItems}
          onAddItem={handleAddItem}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenOrderDrawer={() => setIsDrawerOpen(true)}
        />

        <DeliverySection />

        <TestimonialsSection />

        <AboutSection />

        <FinalCtaSection onOpenOrderDrawer={() => setIsDrawerOpen(true)} />
      </main>

      <Footer />

      <FloatingListBar
        itemCount={totalItemCount}
        isDrawerOpen={isDrawerOpen}
        onOpenOrderDrawer={() => setIsDrawerOpen(true)}
      />

      <WhatsAppOrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />
    </div>
  );
}

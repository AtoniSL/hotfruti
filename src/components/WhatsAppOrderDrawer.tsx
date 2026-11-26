import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Check,
  Copy,
  ExternalLink,
  Minus,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  FulfillmentMode,
  getTotalItemCount,
  OrderFormErrors,
  OrderFormValues,
  OrderItem,
  validateOrderForm,
} from '../utils/order';
import { ProduceImage } from './ProduceImage';
import { EMIL_EASE } from './MotionPrimitives';

interface WhatsAppOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearOrder: () => void;
}

export const WhatsAppOrderDrawer: React.FC<WhatsAppOrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}) => {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState<OrderFormValues>({
    customerName: '',
    fulfillment: 'retirada',
    neighborhood: '',
    notes: '',
  });
  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [copied, setCopied] = useState(false);
  const [submittedReady, setSubmittedReady] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const totalCount = getTotalItemCount(items);
  const whatsAppUrl = buildWhatsAppUrl(items, form);

  const handleSetFulfillment = (mode: FulfillmentMode) => {
    setForm((prev) => ({ ...prev, fulfillment: mode }));
    if (mode === 'retirada') {
      setErrors((prev) => ({ ...prev, neighborhood: undefined }));
    }
  };

  const handlePrepareOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateOrderForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setSubmittedReady(false);
      return;
    }
    setSubmittedReady(true);
  };

  const handleCopySummary = async () => {
    const validation = validateOrderForm(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    const text = buildWhatsAppMessage(items, form);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback gracefully when clipboard permissions are restricted
    }
    setCopied(true);
    setSubmittedReady(true);
    window.setTimeout(() => setCopied(false), 2600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EMIL_EASE }}
          className="fixed inset-0 z-50 flex justify-end bg-[var(--color-purple-deep)]/65 backdrop-blur-[2px]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-drawer-title"
            initial={prefersReduced ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: EMIL_EASE }}
            className="w-full max-w-[460px] h-full bg-[var(--color-cream-soft)] text-[var(--color-black)] flex flex-col overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
        {/* Drawer Header */}
        <div className="bg-[var(--color-purple-dark)] text-[var(--color-white)] px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div>
            <h2
              id="order-drawer-title"
              className="font-display uppercase text-[1.45rem] leading-none tracking-[0.03em]"
            >
              Sua Lista no WhatsApp
            </h2>
            <p className="text-[12.5px] text-[var(--color-cream)]/80 mt-1">
              {STORE_INFO.brandName} · {STORE_INFO.city}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar resumo do pedido"
            className="min-w-[44px] min-h-[44px] rounded-[var(--radius-md)] inline-flex items-center justify-center text-[var(--color-white)] hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Selected Items */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--color-purple-dark)]">
                Opções selecionadas
              </h3>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearOrder}
                  className="text-[12.5px] font-semibold text-[var(--color-red)] hover:underline cursor-pointer min-h-[36px] px-1"
                >
                  Limpar lista
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="rounded-[var(--radius-md)] bg-[var(--color-cream)] border border-[var(--color-purple)]/12 p-5 text-center">
                <p className="text-[14.5px] font-semibold text-[var(--color-black)]">
                  Sua lista ainda está vazia
                </p>
                <p className="mt-1 text-[13px] text-[var(--color-black)]/70">
                  Selecione suas opções fresquinhas no catálogo ou preencha seus
                  dados abaixo para falar direto com a loja no WhatsApp.
                </p>
              </div>
            ) : (
              <ul className="space-y-3" data-testid="drawer-item-list">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="rounded-[var(--radius-md)] bg-[var(--color-white)] border border-[var(--color-purple)]/10 p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <ProduceImage
                        src={product.image}
                        alt={product.name}
                        fallbackEmoji={product.emoji}
                        className="w-12 h-12 rounded-full border border-[var(--color-green-lime)]/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold leading-snug text-[var(--color-black)]">
                          {product.name}
                        </p>
                        <p className="text-[12.5px] text-[var(--color-green)] font-medium mt-0.5">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, -1)}
                        aria-label={`Remover uma unidade de ${product.name}`}
                        className="min-w-[34px] min-h-[34px] rounded-[var(--radius-sm)] bg-[var(--color-cream)] hover:bg-[var(--color-purple)]/12 inline-flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-7 text-center text-[13.5px] font-bold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 1)}
                        aria-label={`Adicionar mais uma unidade de ${product.name}`}
                        className="min-w-[34px] min-h-[34px] rounded-[var(--radius-sm)] bg-[var(--color-cream)] hover:bg-[var(--color-purple)]/12 inline-flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        aria-label={`Excluir ${product.name} da lista`}
                        className="min-w-[34px] min-h-[34px] rounded-[var(--radius-sm)] text-[var(--color-red)] hover:bg-[var(--color-red)]/10 inline-flex items-center justify-center cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <div className="mt-4 pt-3 border-t border-[var(--color-purple)]/12">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-[var(--color-black)]/75">
                    Itens na lista
                  </span>
                  <span
                    data-testid="drawer-item-total"
                    className="font-display text-[1.45rem] text-[var(--color-purple-dark)] tabular-nums"
                  >
                    {totalCount} {totalCount === 1 ? 'item' : 'itens'}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] text-[var(--color-black)]/65">
                  Consultamos disponibilidade e valores fresquinhos do dia
                  diretamente no WhatsApp.
                </p>
              </div>
            )}
          </div>

          {/* Customer Details & Validation Form */}
          <form onSubmit={handlePrepareOrder} noValidate className="space-y-4">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--color-purple-dark)]">
              Dados para agilizar no WhatsApp
            </h3>

            <div>
              <label
                htmlFor="customer-name"
                className="block text-[13.5px] font-semibold text-[var(--color-black)] mb-1.5"
              >
                Seu nome *
              </label>
              <input
                id="customer-name"
                type="text"
                value={form.customerName}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, customerName: e.target.value }));
                  if (errors.customerName) {
                    setErrors((prev) => ({ ...prev, customerName: undefined }));
                  }
                }}
                placeholder="Ex.: Mariana Costa"
                className="w-full min-h-[44px] px-3.5 rounded-[var(--radius-md)] bg-[var(--color-white)] border border-[var(--color-purple)]/20 text-[14.5px] text-[var(--color-black)] focus:outline-none focus:border-[var(--color-purple)]"
              />
              {errors.customerName && (
                <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-[var(--color-red)]">
                  {errors.customerName}
                </p>
              )}
            </div>

            <div>
              <span className="block text-[13.5px] font-semibold text-[var(--color-black)] mb-1.5">
                Como prefere receber?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={form.fulfillment === 'retirada'}
                  onClick={() => handleSetFulfillment('retirada')}
                  className={`min-h-[44px] px-3 rounded-[var(--radius-md)] text-[13.5px] font-semibold cursor-pointer border ${
                    form.fulfillment === 'retirada'
                      ? 'bg-[var(--color-purple-dark)] text-[var(--color-white)] border-[var(--color-purple-dark)]'
                      : 'bg-[var(--color-white)] text-[var(--color-black)] border-[var(--color-purple)]/18'
                  }`}
                >
                  Retirar na loja
                </button>
                <button
                  type="button"
                  aria-pressed={form.fulfillment === 'entrega'}
                  onClick={() => handleSetFulfillment('entrega')}
                  className={`min-h-[44px] px-3 rounded-[var(--radius-md)] text-[13.5px] font-semibold cursor-pointer border ${
                    form.fulfillment === 'entrega'
                      ? 'bg-[var(--color-purple-dark)] text-[var(--color-white)] border-[var(--color-purple-dark)]'
                      : 'bg-[var(--color-white)] text-[var(--color-black)] border-[var(--color-purple)]/18'
                  }`}
                >
                  Entrega em Guarapari
                </button>
              </div>
            </div>

            {form.fulfillment === 'entrega' && (
              <div>
                <label
                  htmlFor="customer-neighborhood"
                  className="block text-[13.5px] font-semibold text-[var(--color-black)] mb-1.5"
                >
                  Bairro em Guarapari *
                </label>
                <input
                  id="customer-neighborhood"
                  type="text"
                  value={form.neighborhood}
                  onChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      neighborhood: e.target.value,
                    }));
                    if (errors.neighborhood) {
                      setErrors((prev) => ({ ...prev, neighborhood: undefined }));
                    }
                  }}
                  placeholder="Ex.: Praia do Morro, Muquiçaba, Centro..."
                  className="w-full min-h-[44px] px-3.5 rounded-[var(--radius-md)] bg-[var(--color-white)] border border-[var(--color-purple)]/20 text-[14.5px] text-[var(--color-black)] focus:outline-none focus:border-[var(--color-purple)]"
                />
                {errors.neighborhood && (
                  <p role="alert" className="mt-1.5 text-[12.5px] font-medium text-[var(--color-red)]">
                    {errors.neighborhood}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="customer-notes"
                className="block text-[13.5px] font-semibold text-[var(--color-black)] mb-1.5"
              >
                Preferências de maturação (opcional)
              </label>
              <input
                id="customer-notes"
                type="text"
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Ex.: Banana mais verdinha, melancia bem doce..."
                className="w-full min-h-[44px] px-3.5 rounded-[var(--radius-md)] bg-[var(--color-white)] border border-[var(--color-purple)]/20 text-[14.5px] text-[var(--color-black)] focus:outline-none focus:border-[var(--color-purple)]"
              />
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="btn-lift btn-shine w-full min-h-[48px] px-5 bg-[var(--color-yellow)] text-[var(--color-black)] font-bold text-[15px] rounded-[var(--radius-md)] hover:brightness-95 cursor-pointer"
              >
                Gerar mensagem do pedido
              </button>

              {submittedReady && (
                <div
                  data-testid="whatsapp-ready-box"
                  className="rounded-[var(--radius-md)] bg-[var(--color-cream)] border border-[var(--color-green)]/35 p-4 space-y-3"
                >
                  <p className="text-[13.5px] font-bold text-[var(--color-green)]">
                    Pedido pronto para enviar no WhatsApp!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-lift btn-shine flex-1 min-h-[44px] px-4 bg-[var(--color-green)] text-[var(--color-white)] font-bold text-[14px] rounded-[var(--radius-md)] inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <span>Abrir WhatsApp</span>
                      <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="btn-lift min-h-[44px] px-4 bg-[var(--color-white)] border border-[var(--color-purple)]/20 text-[var(--color-purple-dark)] font-semibold text-[13.5px] rounded-[var(--radius-md)] inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[var(--color-green)]" aria-hidden="true" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copiar resumo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { CategoryFilter, Product, STORE_INFO } from '../data/catalog';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export type FulfillmentMode = 'retirada' | 'entrega';

export interface OrderFormValues {
  customerName: string;
  fulfillment: FulfillmentMode;
  neighborhood: string;
  notes: string;
}

export interface OrderFormErrors {
  customerName?: string;
  neighborhood?: string;
}

export function filterProductsByCategory(
  products: Product[],
  category: CategoryFilter
): Product[] {
  if (category === 'Todos') {
    return products;
  }
  return products.filter((item) => item.category === category);
}

export function addItemToOrder(items: OrderItem[], product: Product): OrderItem[] {
  const existing = items.find((entry) => entry.product.id === product.id);
  if (existing) {
    return items.map((entry) =>
      entry.product.id === product.id
        ? { ...entry, quantity: entry.quantity + 1 }
        : entry
    );
  }
  return [...items, { product, quantity: 1 }];
}

export function updateItemQuantity(
  items: OrderItem[],
  productId: string,
  delta: number
): OrderItem[] {
  return items
    .map((entry) =>
      entry.product.id === productId
        ? { ...entry, quantity: entry.quantity + delta }
        : entry
    )
    .filter((entry) => entry.quantity > 0);
}

export function removeItemFromOrder(items: OrderItem[], productId: string): OrderItem[] {
  return items.filter((entry) => entry.product.id !== productId);
}

export function getTotalItemCount(items: OrderItem[]): number {
  return items.reduce((sum, entry) => sum + entry.quantity, 0);
}

export function validateOrderForm(values: OrderFormValues): OrderFormErrors {
  const errors: OrderFormErrors = {};
  if (values.customerName.trim().length < 2) {
    errors.customerName = 'Informe seu nome para agilizar o atendimento.';
  }
  if (values.fulfillment === 'entrega' && values.neighborhood.trim().length < 2) {
    errors.neighborhood = 'Informe o bairro em Guarapari para entrega.';
  }
  return errors;
}

export function buildWhatsAppMessage(
  items: OrderItem[],
  form: OrderFormValues
): string {
  const lines: string[] = [
    `Olá, ${STORE_INFO.brandName} - ${STORE_INFO.brandSub}!`,
  ];

  if (form.customerName.trim()) {
    lines.push(`Cliente: ${form.customerName.trim()}`);
  }

  if (items.length === 0) {
    lines.push('Gostaria de conferir a variedade e os valores fresquinhos de hoje em Guarapari.');
  } else {
    lines.push('');
    lines.push('Itens que gostaria de consultar/pedir hoje:');
    for (const entry of items) {
      lines.push(`- ${entry.quantity}x ${entry.product.name}`);
    }
    lines.push('');
    lines.push(`Total de itens na lista: ${getTotalItemCount(items)}`);
  }

  lines.push(
    form.fulfillment === 'entrega'
      ? `Recebimento: Entrega em Guarapari${form.neighborhood.trim() ? ` — Bairro: ${form.neighborhood.trim()}` : ''}`
      : `Recebimento: Retirada na loja (${STORE_INFO.address})`
  );

  if (form.notes.trim()) {
    lines.push(`Observações: ${form.notes.trim()}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(
  items: OrderItem[],
  form: OrderFormValues,
  phoneNumber: string = STORE_INFO.whatsappNumber
): string {
  const message = buildWhatsAppMessage(items, form);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

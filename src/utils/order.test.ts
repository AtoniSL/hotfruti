import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/catalog';
import {
  addItemToOrder,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  filterProductsByCategory,
  getTotalItemCount,
  removeItemFromOrder,
  updateItemQuantity,
  validateOrderForm,
} from './order';

test('filterProductsByCategory returns all items for Todos and narrows accurately per category', () => {
  assert.equal(filterProductsByCategory(PRODUCTS, 'Todos').length, PRODUCTS.length);

  const frutas = filterProductsByCategory(PRODUCTS, 'Frutas');
  assert.equal(frutas.length, 4);
  assert.ok(frutas.every((p) => p.category === 'Frutas'));

  const legumes = filterProductsByCategory(PRODUCTS, 'Legumes');
  assert.equal(legumes.length, 3);
  assert.ok(legumes.every((p) => p.category === 'Legumes'));

  const folhas = filterProductsByCategory(PRODUCTS, 'Folhas & Verduras');
  assert.equal(folhas.length, 3);

  const combos = filterProductsByCategory(PRODUCTS, 'Plantas & Combos');
  assert.equal(combos.length, 2);
});

test('every catalog product defines a local illustrative photo asset', () => {
  assert.ok(PRODUCTS.every((p) => p.image.startsWith('/src/assets/images/prod_')));
});

test('order mutations accurately add, increment, decrement, and remove items', () => {
  const melancia = PRODUCTS[0];
  const tomate = PRODUCTS[2];

  let items = addItemToOrder([], melancia);
  assert.equal(getTotalItemCount(items), 1);

  items = addItemToOrder(items, melancia);
  assert.equal(getTotalItemCount(items), 2);

  items = addItemToOrder(items, tomate);
  assert.equal(getTotalItemCount(items), 3);

  items = updateItemQuantity(items, melancia.id, -1);
  assert.equal(getTotalItemCount(items), 2);

  items = updateItemQuantity(items, melancia.id, -1);
  assert.equal(items.length, 1);
  assert.equal(items[0].product.id, tomate.id);

  items = removeItemFromOrder(items, tomate.id);
  assert.equal(items.length, 0);
  assert.equal(getTotalItemCount(items), 0);
});

test('validateOrderForm enforces customer name and delivery neighborhood when entrega is selected', () => {
  const emptyRetirada = validateOrderForm({
    customerName: ' ',
    fulfillment: 'retirada',
    neighborhood: '',
    notes: '',
  });
  assert.ok(emptyRetirada.customerName);
  assert.equal(emptyRetirada.neighborhood, undefined);

  const emptyEntrega = validateOrderForm({
    customerName: 'Carlos',
    fulfillment: 'entrega',
    neighborhood: '',
    notes: '',
  });
  assert.equal(emptyEntrega.customerName, undefined);
  assert.ok(emptyEntrega.neighborhood);

  const validEntrega = validateOrderForm({
    customerName: 'Carlos Silva',
    fulfillment: 'entrega',
    neighborhood: 'Praia do Morro',
    notes: 'Melancia bem doce',
  });
  assert.deepEqual(validEntrega, {});
});

test('buildWhatsAppMessage and buildWhatsAppUrl include selected items without prices', () => {
  const melancia = PRODUCTS[0];
  const items = addItemToOrder(addItemToOrder([], melancia), melancia);
  const form = {
    customerName: 'Mariana',
    fulfillment: 'entrega' as const,
    neighborhood: 'Muquiçaba',
    notes: 'Sem sacola extra',
  };

  const message = buildWhatsAppMessage(items, form);
  assert.ok(message.includes('2x Melancia Doce Selecionada'));
  assert.ok(message.includes('Total de itens na lista: 2'));
  assert.ok(!message.includes('R$'));
  assert.ok(message.includes('Mariana'));
  assert.ok(message.includes('Muquiçaba'));
  assert.ok(message.includes('Sem sacola extra'));

  const url = buildWhatsAppUrl(items, form, '5527999990028');
  assert.ok(url.startsWith('https://wa.me/5527999990028?text='));
  assert.ok(decodeURIComponent(url).includes('2x Melancia Doce Selecionada'));
});

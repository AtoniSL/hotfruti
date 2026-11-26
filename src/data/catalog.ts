export type ProductCategory =
  | 'Frutas'
  | 'Legumes'
  | 'Folhas & Verduras'
  | 'Plantas & Combos';

export type CategoryFilter = 'Todos' | ProductCategory;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  emoji: string;
  image: string;
  highlightNote?: string;
}

export interface HeroShowcaseItem {
  id: string;
  name: string;
  note: string;
  emoji: string;
  image: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  emoji: string;
  image: string;
  targetCategory: CategoryFilter;
  ctaLabel: string;
}

export interface DailyTip {
  id: string;
  title: string;
  description: string;
  emoji: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  initials: string;
  quote: string;
  rating: number;
  avatarBg: string;
}

export const PRODUCE_IMAGES = {
  melancia: '/src/assets/images/prod_melancia_1795715233740.jpg',
  banana: '/src/assets/images/prod_banana_1795715233426.jpg',
  tomate: '/src/assets/images/prod_tomate_1795715234616.jpg',
  chuchu: '/src/assets/images/prod_chuchu_1795715235281.jpg',
  alface: '/src/assets/images/prod_alface_1795715235987.jpg',
  couve: '/src/assets/images/prod_couve_1795715238017.jpg',
  flores: '/src/assets/images/prod_flores_1795715238022.jpg',
  cesta: '/src/assets/images/prod_cesta_sacolao_1795715238304.jpg',
  abacaxi: '/src/assets/images/prod_abacaxi_1795715239878.jpg',
  abacate: '/src/assets/images/prod_abacate_1795715239203.jpg',
  cenoura: '/src/assets/images/prod_cenoura_1795715241753.jpg',
  brocolis: '/src/assets/images/prod_brocolis_1795715241264.jpg',
};

export const EDITORIAL_IMAGES = {
  heroBackdrop: '/src/assets/images/hero_abundant_produce_1795716426883.jpg',
  quemSomos: '/src/assets/images/editorial_quem_somos_1795716428015.jpg',
  deliveryBox: '/src/assets/images/editorial_delivery_whatsapp_1795716429444.jpg',
  bannerBackdrop: '/src/assets/images/banner_dark_produce_1795716429856.jpg',
};

export const ABOUT_DIFFERENTIALS = [
  'Ambiente 100% climatizado',
  'Seleção diária no ponto certo',
  'Variedade completa de safra',
  'Quarta e Sábado de ofertas',
  'Plantas e flores selecionadas',
  'Atendimento rápido no WhatsApp',
];

export const DELIVERY_STEPS = [
  {
    step: '01',
    title: 'Escolha suas opções',
    description: 'Navegue pelas frutas, legumes, folhas e combos fresquinhos.',
  },
  {
    step: '02',
    title: 'Envie no WhatsApp',
    description: 'Sua lista chega organizada para nossa equipe separar tudo no ponto.',
  },
  {
    step: '03',
    title: 'Retire ou receba em casa',
    description: 'Passe na loja climatizada ou peça entrega rápida em Guarapari.',
  },
];

export const STORE_INFO = {
  brandName: 'Bom de Preço',
  brandSub: 'HortiFruti & Cia',
  instagramHandle: '@bomdeprecohortifruti',
  instagramUrl: 'https://instagram.com/bomdeprecohortifruti',
  slogan: 'Qualidade e Preço Incrível — Tudo fresquinho em ambiente climatizado.',
  address: 'Rua Ernesto Geisel, Nº 28 — Guarapari, ES',
  city: 'Guarapari, ES',
  hoursWeek: 'Seg–Sáb: 07h30–19h30',
  hoursSunday: 'Dom: 08h00–13h00',
  // Placeholder configurável do WhatsApp da loja (DDD 27 - ES)
  whatsappNumber: '5527999990028',
};

export const CATEGORY_FILTERS: CategoryFilter[] = [
  'Todos',
  'Frutas',
  'Legumes',
  'Folhas & Verduras',
  'Plantas & Combos',
];

export const HERO_SHOWCASE_ITEMS: HeroShowcaseItem[] = [
  {
    id: 'hero-melancia',
    name: 'Melancia Doce',
    note: 'Polpa vermelha e suculenta',
    emoji: '🍉',
    image: PRODUCE_IMAGES.melancia,
  },
  {
    id: 'hero-tomate',
    name: 'Tomate Italiano',
    note: 'Firme para saladas e molhos',
    emoji: '🍅',
    image: PRODUCE_IMAGES.tomate,
  },
  {
    id: 'hero-alface',
    name: 'Alface Crespa',
    note: 'Hidropônica bem crocante',
    emoji: '🥬',
    image: PRODUCE_IMAGES.alface,
  },
  {
    id: 'hero-abacaxi',
    name: 'Abacaxi Pérola',
    note: 'Aromático no ponto certo',
    emoji: '🍍',
    image: PRODUCE_IMAGES.abacaxi,
  },
];

export const HERO_VARIETY_THUMBS = [
  { id: 'thumb-banana', alt: 'Banana prata', emoji: '🍌', image: PRODUCE_IMAGES.banana },
  { id: 'thumb-abacate', alt: 'Abacate manteiga', emoji: '🥑', image: PRODUCE_IMAGES.abacate },
  { id: 'thumb-cenoura', alt: 'Cenoura fresca', emoji: '🥕', image: PRODUCE_IMAGES.cenoura },
  { id: 'thumb-flores', alt: 'Vaso de flores', emoji: '🪴', image: PRODUCE_IMAGES.flores },
];

export const HIGHLIGHTS: HighlightItem[] = [
  {
    id: 'frutas-estacao',
    title: 'Frutas da Estação',
    description:
      'Melancia docinha, banana prata madura no ponto certo e abacaxi pérola selecionados direto do produtor.',
    tag: 'Seleção da safra',
    emoji: '🍉',
    image: PRODUCE_IMAGES.melancia,
    targetCategory: 'Frutas',
    ctaLabel: 'Ver frutas',
  },
  {
    id: 'folhas-verduras',
    title: 'Folhas & Verduras',
    description:
      'Alface hidropônica crocante, couve manteiga colhida no dia e verduras mantidas no clima ideal da loja.',
    tag: 'Colhidas no dia',
    emoji: '🥬',
    image: PRODUCE_IMAGES.alface,
    targetCategory: 'Folhas & Verduras',
    ctaLabel: 'Ver folhas',
  },
  {
    id: 'quarta-sabado-ofertas',
    title: 'Quarta e Sábado de Ofertas',
    description:
      'Os dias mais esperados em Guarapari: bancas abastecidas cedo com grande variedade e qualidade selecionada.',
    tag: 'Especiais da semana',
    emoji: '🍅',
    image: PRODUCE_IMAGES.cesta,
    targetCategory: 'Legumes',
    ctaLabel: 'Ver legumes',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'melancia-doce',
    name: 'Melancia Doce Selecionada',
    category: 'Frutas',
    description: 'Polpa vermelha, bem docinha e hidratante',
    emoji: '🍉',
    image: PRODUCE_IMAGES.melancia,
    highlightNote: 'Destaque do dia',
  },
  {
    id: 'banana-prata',
    name: 'Banana Prata Climatizada',
    category: 'Frutas',
    description: 'Madura no ponto certo, direto do produtor',
    emoji: '🍌',
    image: PRODUCE_IMAGES.banana,
  },
  {
    id: 'tomate-italiano',
    name: 'Tomate Italiano Fresco',
    category: 'Legumes',
    description: 'Firme, selecionado para saladas e molhos',
    emoji: '🍅',
    image: PRODUCE_IMAGES.tomate,
    highlightNote: 'Quarta & Sábado',
  },
  {
    id: 'chuchu-verde',
    name: 'Chuchu Verde Selecionado',
    category: 'Legumes',
    description: 'Rico em água, fibras e super leve',
    emoji: '🥒',
    image: PRODUCE_IMAGES.chuchu,
  },
  {
    id: 'alface-crespa',
    name: 'Alface Crespa Hidropônica',
    category: 'Folhas & Verduras',
    description: 'Folhas crocantes, higienizadas e fresquinhas',
    emoji: '🥬',
    image: PRODUCE_IMAGES.alface,
  },
  {
    id: 'couve-manteiga',
    name: 'Couve Manteiga Maço',
    category: 'Folhas & Verduras',
    description: 'Folhas macias colhidas no dia',
    emoji: '🌿',
    image: PRODUCE_IMAGES.couve,
  },
  {
    id: 'vaso-flores',
    name: 'Vaso de Flores da Estação',
    category: 'Plantas & Combos',
    description: 'Plantas e flores selecionadas para sua casa',
    emoji: '🪴',
    image: PRODUCE_IMAGES.flores,
  },
  {
    id: 'combo-sacolao',
    name: 'Combo Sacolão da Semana',
    category: 'Plantas & Combos',
    description: 'Mix com 5 frutas + 5 legumes + 2 folhas frescas',
    emoji: '🧺',
    image: PRODUCE_IMAGES.cesta,
    highlightNote: 'Mais pedido',
  },
  {
    id: 'abacaxi-perola',
    name: 'Abacaxi Pérola Doce',
    category: 'Frutas',
    description: 'Docinho, aromático e selecionado no ponto',
    emoji: '🍍',
    image: PRODUCE_IMAGES.abacaxi,
  },
  {
    id: 'abacate-manteiga',
    name: 'Abacate Manteiga',
    category: 'Frutas',
    description: 'Polpa cremosa, rico em gorduras boas e fibras',
    emoji: '🥑',
    image: PRODUCE_IMAGES.abacate,
  },
  {
    id: 'cenoura-fresca',
    name: 'Cenoura Selecionada',
    category: 'Legumes',
    description: 'Crocante, adocicada e fonte de betacaroteno',
    emoji: '🥕',
    image: PRODUCE_IMAGES.cenoura,
  },
  {
    id: 'brocolis-ninja',
    name: 'Brócolis Ninja Fresco',
    category: 'Folhas & Verduras',
    description: 'Floretes firmes, verdinhos e muito nutritivos',
    emoji: '🥦',
    image: PRODUCE_IMAGES.brocolis,
  },
];

export const FEATURED_BASKET = {
  productId: 'combo-sacolao',
  eyebrow: 'SELEÇÃO ESPECIAL DO DIA · QUARTA E SÁBADO',
  title: 'Cesta Fresquinha da Família',
  description:
    'Montada na hora pela nossa equipe dentro da loja climatizada. Reúne frutas no ponto certo de maturação, legumes firmes para o almoço da semana e folhas verdes crocantes — com praticidade para retirar na loja ou pedir pelo WhatsApp.',
  image: PRODUCE_IMAGES.cesta,
  emoji: '🧺',
  availabilityNote: 'Montada na hora sob encomenda · Consulte no WhatsApp',
  benefits: [
    '5 frutas da estação escolhidas no ponto ideal (melancia, banana, abacaxi e mais)',
    '5 legumes selecionados para saladas, refogados e molhos da semana',
    '2 maços de folhas e verduras frescas colhidas no dia',
    'Conservação em ambiente climatizado: muito mais durabilidade na sua geladeira',
  ],
};

export const DAILY_TIPS: DailyTip[] = [
  {
    id: 'cor',
    title: 'Cor viva e uniforme',
    description: 'Observe a tonalidade característica de cada fruta madura e sem manchas escuras.',
    emoji: '🍉',
    image: PRODUCE_IMAGES.melancia,
  },
  {
    id: 'textura',
    title: 'Textura firme ao toque',
    description: 'Toque levemente: legumes e frutas no ponto certo cedem pouco e preservam o frescor.',
    emoji: '🥑',
    image: PRODUCE_IMAGES.abacate,
  },
  {
    id: 'aroma',
    title: 'Aroma doce natural',
    description: 'Abacaxi, melão e mangas maduros exalam perfume adocicado próximo à base.',
    emoji: '🍍',
    image: PRODUCE_IMAGES.abacaxi,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'mariana',
    name: 'Mariana C.',
    context: 'Cliente de Guarapari',
    initials: 'MC',
    quote:
      'Ambiente climatizado faz toda diferença! As frutas e folhas duram muito mais em casa.',
    rating: 5,
    avatarBg: 'var(--color-purple)',
  },
  {
    id: 'roberto',
    name: 'Roberto A.',
    context: 'Cliente de Quarta e Sábado',
    initials: 'RA',
    quote:
      'Melhor hortifruti de Guarapari. Quarta e sábado sempre tem preço imbatível.',
    rating: 5,
    avatarBg: 'var(--color-green)',
  },
  {
    id: 'juliana',
    name: 'Juliana P.',
    context: 'Pedido pelo WhatsApp',
    initials: 'JP',
    quote:
      'Atendimento rápido pelo WhatsApp e tudo chega bem escolhido e fresquinho.',
    rating: 5,
    avatarBg: 'var(--color-purple-dark)',
  },
];

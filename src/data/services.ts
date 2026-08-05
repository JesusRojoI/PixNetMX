export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  price: number;
  image?: string;
}

export const uxuiServices: ServiceItem[] = [
  {
    id: 'uxui-basic',
    titleKey: 'solutions.services.uxuiBasic.title',
    descKey: 'solutions.services.uxuiBasic.desc',
    price: 13500,
  },
  {
    id: 'uxui-standard',
    titleKey: 'solutions.services.uxuiStandard.title',
    descKey: 'solutions.services.uxuiStandard.desc',
    price: 22700,
  },
  {
    id: 'uxui-redesign',
    titleKey: 'solutions.services.uxuiRedesign.title',
    descKey: 'solutions.services.uxuiRedesign.desc',
    price: 30000,
  },
];

export const devServices: ServiceItem[] = [
  {
    id: 'web-static',
    titleKey: 'solutions.services.webStatic.title',
    descKey: 'solutions.services.webStatic.desc',
    price: 13800,
  },
  {
    id: 'web-dynamic',
    titleKey: 'solutions.services.webDynamic.title',
    descKey: 'solutions.services.webDynamic.desc',
    price: 19600,
  },
  {
    id: 'ecommerce',
    titleKey: 'solutions.services.ecommerce.title',
    descKey: 'solutions.services.ecommerce.desc',
    price: 25100,
  },
  {
    id: 'app-simple',
    titleKey: 'solutions.services.appSimple.title',
    descKey: 'solutions.services.appSimple.desc',
    price: 45000,
  },
  {
    id: 'app-complex',
    titleKey: 'solutions.services.appComplex.title',
    descKey: 'solutions.services.appComplex.desc',
    price: 80100,
  },
  {
    id: 'api-integration',
    titleKey: 'solutions.services.apiIntegration.title',
    descKey: 'solutions.services.apiIntegration.desc',
    price: 10000,
  },
];

export const packageServices: ServiceItem[] = [
  {
    id: 'landing-ultra',
    titleKey: 'solutions.packages.landingUltra.title',
    descKey: 'solutions.packages.landingUltra.desc',
    price: 100,
    image: '/paquetes/landing-ultra-basica.png',
  },
  {
    id: 'page-simple',
    titleKey: 'solutions.packages.pageSimple.title',
    descKey: 'solutions.packages.pageSimple.desc',
    price: 3250,
    image: '/paquetes/pagina-informativa-simple.png',
  },
  {
    id: 'digital-card',
    titleKey: 'solutions.packages.digitalCard.title',
    descKey: 'solutions.packages.digitalCard.desc',
    price: 500,
    image: '/paquetes/tarjeta-digital.png',
  },
  {
    id: 'landing-promo',
    titleKey: 'solutions.packages.landingPromo.title',
    descKey: 'solutions.packages.landingPromo.desc',
    price: 2500,
    image: '/paquetes/landing-promocion.png',
  },
  {
    id: 'one-page',
    titleKey: 'solutions.packages.onePage.title',
    descKey: 'solutions.packages.onePage.desc',
    price: 4850,
    image: '/paquetes/one-page-profesional.png',
  },
  {
    id: 'catalog',
    titleKey: 'solutions.packages.catalog.title',
    descKey: 'solutions.packages.catalog.desc',
    price: 7580,
    image: '/paquetes/catalogo-online.png',
  },
  {
    id: 'blog',
    titleKey: 'solutions.packages.blog.title',
    descKey: 'solutions.packages.blog.desc',
    price: 9120,
    image: '/paquetes/blog-profesional.png',
  },
  {
    id: 'institutional',
    titleKey: 'solutions.packages.institutional.title',
    descKey: 'solutions.packages.institutional.desc',
    price: 12460,
    image: '/paquetes/sitio-institucional.png',
  },
];

export interface CartItem {
  id: string;
  titleKey: string;
  price: number;
  quantity: number;
  image?: string;
}

export const getServiceById = (id: string): ServiceItem | undefined => {
  return [...uxuiServices, ...devServices, ...packageServices].find(s => s.id === id);
};
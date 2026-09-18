/**
 * Fonte única de laboratórios e catálogos.
 *
 * Os PDFs ficam no Google Drive. Para cada catálogo, cole o ID do arquivo
 * (o trecho entre /d/ e /view no link de compartilhamento) em `driveId`.
 * Enquanto `driveId` estiver vazio o card aparece como "em breve" e o
 * painel do laboratório como "sob consulta".
 */

export type Catalog = {
  id: string;
  title: string;
  sub: string;
  driveId: string;
  /** slug do laboratório dono do catálogo (define a logo do card) */
  lab: Lab['slug'];
};

export type Lab = {
  slug: string;
  name: string;
  /** id do catálogo principal (abre ao clicar no painel) */
  catalog?: Catalog['id'];
  /** fundo escuro no painel para logos claras */
  dark?: boolean;
};

export const catalogs: Catalog[] = [
  { id: 'legrand-institucional', title: 'Legrand · Institucional', sub: 'Abril 2026',       driveId: '1CF61tbL4yRllLz5CV469B5bqVlwWmnVK', lab: 'legrand' },
  { id: 'legrand-ems',           title: 'Legrand · Genéricos EMS', sub: '2026',             driveId: '1rVsI8EyzTYomYoDY3mq0Z5QSP8Jdz9MK', lab: 'legrand-genericos' },
  { id: 'vitamedic',             title: 'Vitamedic',               sub: '1º semestre 2026', driveId: '1_VIvUE7rTK2o2KDX6s5eb0N8K3THCqI2', lab: 'vitamedic' },
  { id: 'brasterapica',          title: 'Brasterápica',            sub: 'Março 2026',       driveId: '1aJqjHNtNCX8vn6LFmN2StuH6y5xH8kV9', lab: 'brasterapica' },
  { id: 'althaia',               title: 'Althaia',                 sub: 'Vigente',          driveId: '1CbI7v68P_KMF8Wc0ZdnO80j3gIimlC4C', lab: 'althaia' },
  { id: 'pharlab',               title: 'Pharlab',                 sub: 'Vigente',          driveId: '1NdvWSPAwE5Op08IQJlU4w1C_rZytrsuE', lab: 'pharlab' },
  { id: 'globo',                 title: 'Globo Pharma',            sub: 'Vigente',          driveId: '1Xd2Be2_5P_U7i_zM6v5rGLc9fCReimp-', lab: 'globo' },
  { id: 'agua-rabelo',           title: 'Água Rabelo',             sub: 'Abril 2026',       driveId: '1djEb8NiTLJXWbsO6jdjWal3l63yJxbhX', lab: 'agua-rabelo' },
  { id: 'prati',                 title: 'Prati Donaduzzi',         sub: 'Marcas · 2027',    driveId: '10b2FrbIAv_ISHi6BK6emG6kEKtXnP4Wm', lab: 'prati' },
  { id: 'teuto-marcas',          title: 'Teuto · Marcas',          sub: 'Agosto 2026',      driveId: '1GabAiGsoc399hpEXMKzz71DgAKl7hn5W', lab: 'teuto' },
  { id: 'teuto-genericos',       title: 'Teuto · Genéricos',       sub: '2026.2',           driveId: '1AdR0JRecEa8OlWFQI18K1HD2n4v8ir6_', lab: 'teuto' },
  { id: 'belfar',                title: 'Belfar',                  sub: 'Vigente',          driveId: '1AEJMeAc-l0WrPtF5KZsaRcymrjJz1nA9', lab: 'belfar' },
  { id: 'natulab',               title: 'Natulab',                 sub: 'Vigente',          driveId: '1pPQp1BH5vLFyVqbSC3UVJXoJc4jJuBw1', lab: 'natulab' },
  { id: 'sanfarma',              title: 'Sanfarma',                sub: 'Linha completa',   driveId: '1Q7n5zJHb9JurOs2JErZs5YFoCeKfmEnG', lab: 'sanfarma' },
  { id: 'sanfarma-disney',       title: 'Sanfarma · Disney',       sub: 'Linha infantil',   driveId: '1pBXVgPd6NJ-xt3-oDUmALSr1qA2upKCu', lab: 'sanfarma' },
];

export const labs: Lab[] = [
  { slug: 'althaia',           name: 'Althaia',           catalog: 'althaia' },
  { slug: 'legrand',           name: 'Legrand',           catalog: 'legrand-institucional' },
  { slug: 'legrand-genericos', name: 'Legrand Genéricos', catalog: 'legrand-ems', dark: true },
  { slug: 'vitamedic',         name: 'Vitamedic',         catalog: 'vitamedic' },
  { slug: 'brasterapica',      name: 'Brasterápica',      catalog: 'brasterapica' },
  { slug: 'pharlab',           name: 'Pharlab',           catalog: 'pharlab' },
  { slug: 'globo',             name: 'Globo Pharma',      catalog: 'globo' },
  { slug: 'agua-rabelo',       name: 'Água Rabelo',       catalog: 'agua-rabelo' },
  { slug: 'prati',             name: 'Prati Donaduzzi',   catalog: 'prati' },
  { slug: 'teuto',             name: 'Teuto',             catalog: 'teuto-marcas' },
  { slug: 'torrent',           name: 'Torrent Pharma',    dark: true },
  { slug: 'belfar',            name: 'Belfar',            catalog: 'belfar' },
  { slug: 'cazi',              name: 'Cazi' },
  { slug: 'natulab',           name: 'Natulab',           catalog: 'natulab' },
  { slug: 'sanfarma',          name: 'Sanfarma',          catalog: 'sanfarma' },
];

/** Link de visualização do Drive (abre o PDF no navegador com botão de download). */
export function catalogHref(c?: Catalog): string | undefined {
  if (!c || !c.driveId) return undefined;
  return `https://drive.google.com/file/d/${c.driveId}/view`;
}

export function labBySlug(slug: string): Lab | undefined {
  return labs.find((l) => l.slug === slug);
}

export function labLogo(slug: string): string {
  return `/assets/labs/${slug}.jpeg`;
}

export function catalogById(id?: string): Catalog | undefined {
  return id ? catalogs.find((c) => c.id === id) : undefined;
}

export const availableCatalogs = () => catalogs.filter((c) => c.driveId);

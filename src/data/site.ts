export const site = {
  name: 'Rogério Dias',
  fullName: 'Rogério Ferreira Dias',
  role: 'Representante comercial · Grupo PBMED',
  city: 'João Pessoa · PB',
  whatsapp: '558388300570',
  whatsappDisplay: '+55 83 8830-0570',
  whatsappMessage: 'Ola, Rogerio! Vi seu portfolio do Grupo PBMED e queria uma cotacao.',
  email: 'rogerio_ferreira_dias@hotmail.com',
  updatedLabel: 'Portfólio atualizado em setembro',
  description:
    'Rogério Dias — representante comercial do Grupo PBMED em João Pessoa. Medicamentos de 15 laboratórios para farmácias, redes, clínicas e hospitais, com catálogos em PDF.',
} as const;

export const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
export const emailHref = `mailto:${site.email}`;

# Rogério Dias · Portfólio

Site de uma página do representante comercial Rogério Dias (Grupo PBMED).

**Stack:** [Astro](https://astro.build) · [Tailwind CSS v4](https://tailwindcss.com) · [GSAP](https://gsap.com) (ScrollTrigger)

## Rodando

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera ./dist
npm run preview  # serve o build
```

## Estrutura

```
src/
  data/site.ts          contato, textos fixos
  data/labs.ts          laboratórios + catálogos (fonte única)
  layouts/Base.astro    <head>, fontes, wrapper
  components/           uma seção por arquivo
  scripts/animations.ts preloader, hero, reveals e marquee (GSAP)
  styles/global.css     tokens de design (@theme) e utilitários
public/assets/labs/     logos dos laboratórios
```

## Catálogos (Google Drive)

Os PDFs ficam no Google Drive, não no repositório. Para publicar um catálogo:

1. Suba o PDF no Drive e deixe em **"Qualquer pessoa com o link → Leitor"**.
2. Copie o ID do link: `https://drive.google.com/file/d/`**`ID_AQUI`**`/view`.
3. Cole em `driveId` do catálogo correspondente em `src/data/labs.ts`.

Enquanto o `driveId` estiver vazio, o card aparece como "em breve" e o painel
do laboratório como "sob consulta".

Para adicionar um laboratório novo: coloque a logo em `public/assets/labs/<slug>.jpeg`
e acrescente a entrada em `labs` (e em `catalogs`, se tiver PDF).

## Deploy

Vercel detecta Astro automaticamente — importe o repositório e pronto.
Build command `astro build`, output `dist`.

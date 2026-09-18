# Rogério Dias · Portfólio comercial

Site de uma página do representante comercial **Rogério Dias** (Grupo PBMED, João Pessoa · PB).
Apresenta os 15 laboratórios representados, a trajetória profissional e os catálogos de produtos em PDF, com contato direto por WhatsApp.

**Produção:** https://www.rogerioferreiradias.com

![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)

---

## Sumário

- [Visão geral](#visão-geral)
- [Stack](#stack)
- [Rodando localmente](#rodando-localmente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Editando o conteúdo](#editando-o-conteúdo)
  - [Dados de contato e textos](#dados-de-contato-e-textos)
  - [Catálogos em PDF (Google Drive)](#catálogos-em-pdf-google-drive)
  - [Adicionando um laboratório](#adicionando-um-laboratório)
- [Design system](#design-system)
- [Animações e acessibilidade](#animações-e-acessibilidade)
- [Deploy](#deploy)

---

## Visão geral

O site é **100 % estático**: não há backend, banco de dados ou variáveis de ambiente. Todo o conteúdo editável vive em dois arquivos TypeScript (`src/data/`), e os PDFs dos catálogos ficam hospedados no Google Drive — o repositório só guarda os IDs.

Seções, na ordem em que aparecem:

| Seção | Componente | O que mostra |
|---|---|---|
| Preloader | `Preloader.astro` | Contador 0→100 e cortina de entrada |
| Navegação | `Nav.astro` | Logo, âncoras das seções e botão "Contato" |
| Hero | `Hero.astro` | Nome, cargo, retrato e chamada principal |
| Marquee | `Marquee.astro` | Faixa contínua com os laboratórios |
| História | `Historia.astro` | Trajetória profissional |
| Portfólio | `LabPanels.astro` | Painéis expansíveis com a logo de cada laboratório; clique abre o catálogo |
| Números | `Numeros.astro` | Indicadores (laboratórios, catálogos vigentes, atendimento) |
| Catálogos | `Catalogos.astro` | Grid de cards com download dos PDFs |
| Rodapé | `Footer.astro` | Contato por WhatsApp e e-mail, data de atualização |

Os contadores da seção *Números* são derivados dos dados — o total de laboratórios e de catálogos vigentes se atualiza sozinho quando `labs.ts` muda.

## Stack

- **[Astro 7](https://astro.build)** — geração estática, zero JS por padrão
- **[Tailwind CSS 4](https://tailwindcss.com)** — via `@tailwindcss/vite`, tokens declarados em `@theme`
- **[GSAP 3](https://gsap.com)** + ScrollTrigger — preloader, entrada do hero, reveals por scroll e marquee
- **TypeScript** (`astro/tsconfigs/strict`) com alias `@/*` → `src/*`
- Fontes: **Anton** (display) e **Onest** (texto), via Google Fonts

## Rodando localmente

Requer **Node.js 22.12+** (exigência do Astro 7).

```bash
npm install
npm run dev       # http://localhost:4321 com hot reload
```

Outros scripts:

| Comando | Descrição |
|---|---|
| `npm run build` | Gera o site estático em `./dist` |
| `npm run preview` | Serve o conteúdo de `./dist` localmente |
| `npm run check` | Roda o `astro check` (tipos e diagnósticos dos `.astro`) |

## Estrutura do projeto

```
├── astro.config.mjs        # site URL + plugin do Tailwind
├── tsconfig.json           # strict + alias @/*
├── public/
│   ├── favicon.svg
│   └── assets/
│       ├── rogerio.webp    # retrato do hero
│       ├── logo-pbmed.webp
│       └── labs/           # uma logo por laboratório: <slug>.jpeg
└── src/
    ├── data/
    │   ├── site.ts         # nome, cargo, WhatsApp, e-mail, descrição (SEO)
    │   └── labs.ts         # laboratórios + catálogos — fonte única
    ├── layouts/
    │   └── Base.astro      # <head>, meta tags, fontes, wrapper
    ├── pages/
    │   └── index.astro     # monta as seções na ordem
    ├── components/         # uma seção por arquivo (ver tabela acima)
    ├── scripts/
    │   └── animations.ts   # toda a lógica GSAP
    └── styles/
        └── global.css      # tokens (@theme) e utilitários (@utility)
```

## Editando o conteúdo

### Dados de contato e textos

[`src/data/site.ts`](src/data/site.ts) concentra tudo que é fixo: nome, cargo, cidade, número de WhatsApp (e a mensagem pré-preenchida do link), e-mail, rótulo de "portfólio atualizado em…" e a descrição usada nas meta tags. Os links `waHref` e `emailHref` são gerados a partir desses campos.

### Catálogos em PDF (Google Drive)

Os PDFs **não ficam no repositório** — eles pesam dezenas de MB cada. Ficam no Google Drive e o site aponta para o link de visualização (`https://drive.google.com/file/d/<ID>/view`), que abre o PDF no navegador com botão de download.

Para publicar ou trocar um catálogo:

1. Suba o PDF no Drive.
2. **Compartilhar → Acesso geral → "Qualquer pessoa com o link" → Leitor.** Sem isso o visitante verá uma tela de "solicitar acesso".
3. Copie o link e extraia o ID (o trecho entre `/d/` e `/view`):
   ```
   https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
                                    └──────────── ID ────────────┘
   ```
4. Cole em `driveId` do catálogo correspondente em [`src/data/labs.ts`](src/data/labs.ts):
   ```ts
   { id: 'vitamedic', title: 'Vitamedic', sub: '1º semestre 2026', driveId: '1AbCdEf…', lab: 'vitamedic' },
   ```

Comportamento quando `driveId` está vazio: o card aparece como **"em breve"** (sem link) e o painel do laboratório como **"sob consulta"**. Nada quebra — o site pode ir ao ar com catálogos pendentes.

> **Atualizando um catálogo já publicado:** no Drive, clique com o botão direito no PDF → *Gerenciar versões* → *Fazer upload de nova versão*. O ID é preservado, então não é preciso alterar o código nem fazer novo deploy.

### Adicionando um laboratório

1. Salve a logo em `public/assets/labs/<slug>.jpeg` (fundo branco ou transparente; para logos claras, use `dark: true` na entrada para o painel ganhar fundo escuro).
2. Acrescente a entrada em `labs`:
   ```ts
   { slug: 'novo-lab', name: 'Novo Lab', catalog: 'novo-lab', dark: false },
   ```
3. Se houver PDF, acrescente também em `catalogs` (o `id` deve bater com o `catalog` acima e `lab` com o `slug`):
   ```ts
   { id: 'novo-lab', title: 'Novo Lab', sub: 'Vigente', driveId: '', lab: 'novo-lab' },
   ```

Um laboratório pode ter mais de um catálogo (ex.: Teuto · Marcas e Teuto · Genéricos); o campo `catalog` do laboratório define qual deles abre ao clicar no painel.

## Design system

Tokens definidos em [`src/styles/global.css`](src/styles/global.css) via `@theme` e disponíveis como classes Tailwind (`bg-ink`, `text-coral`, `px-gutter`, `py-section`, `font-display`…):

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#0B0E13` | fundo |
| `bone` | `#F3F1EA` | texto principal |
| `coral` | `#E3261A` | acento, hover, CTA |
| `mist` / `steel` | `#8B8F98` / `#9BA6B8` | texto secundário |
| `card` / `panel-dark` | `#111722` / `#16202E` | superfícies |
| `line` / `line-strong` | bone a 10 % / 22 % | bordas |
| `gutter` | `clamp(16px, 4vw, 40px)` | margem lateral |
| `section` | `clamp(48px, 7vw, 120px)` | espaçamento vertical entre seções |

Utilitários de tipografia recorrentes: `eyebrow` (rótulo em caixa alta), `display-h2` (título de seção em Anton) e `lead` (parágrafo de apoio).

## Animações e acessibilidade

Toda a animação está em [`src/scripts/animations.ts`](src/scripts/animations.ts) e é controlada por atributos `data-*` no HTML:

| Atributo | Efeito |
|---|---|
| `data-anim` | Elemento sobe 28 px e aparece ao entrar na viewport (uma vez) |
| `data-anim-group` | Filhos `data-anim` entram em cascata (stagger de 90 ms, até 8 itens) |
| `data-hero-letter` / `-line` / `-fade` / `-photo` | Sequência de entrada do hero, sincronizada com o fim do preloader |
| `data-marquee` | Faixa infinita (conteúdo duplicado no HTML, translada −50 %) |

Cuidados implementados:

- **Sem JavaScript, a página aparece inteira.** Os elementos animados só começam invisíveis quando a classe `html.js` está presente.
- **`prefers-reduced-motion: reduce`** desativa todas as animações via `gsap.matchMedia()` e o CSS força `opacity: 1`.
- O preloader tem uma trava de segurança: se o timeline travar, a cortina sobe mesmo assim em 3,6 s.
- Painéis de laboratório são focáveis por teclado e têm `title` descritivo; links externos usam `rel="noopener"`.

## Deploy

O projeto está configurado para a **Vercel**, que detecta Astro automaticamente:

| Configuração | Valor |
|---|---|
| Framework | Astro |
| Build command | `astro build` |
| Output directory | `dist` |
| Variáveis de ambiente | nenhuma |

Basta importar o repositório; cada push na `main` gera um novo deploy. A URL pública está declarada em `astro.config.mjs` (`site`) e é usada para as meta tags Open Graph.

Qualquer outro host de arquivos estáticos (Netlify, Cloudflare Pages, GitHub Pages) funciona com os mesmos comandos.

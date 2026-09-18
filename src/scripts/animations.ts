import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/** cubic-bezier(0.16,1,0.3,1) do site original ≈ expo.out */
const EASE = 'expo.out';

const $ = <T extends HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ── Preloader: contador 0→100 em 2s, labels somem, cortina sobe ── */
function preloader(): number {
  const pre = document.querySelector<HTMLElement>('[data-preloader]');
  const count = pre?.querySelector<HTMLElement>('[data-count]');
  if (!pre || !count) return 0;

  pre.style.display = 'flex';
  const n = { v: 0 };
  const tl = gsap.timeline({ onComplete: () => (pre.style.display = 'none') });

  tl.to(n, { v: 100, duration: 2, ease: 'none', onUpdate: () => (count.textContent = String(Math.round(n.v))) })
    .to($('[data-preloader-label]', pre), { opacity: 0, duration: 0.3, ease: 'power1.out' })
    .to(pre, { yPercent: -100, duration: 0.65, ease: 'power3.out' }, '+=0.12');

  // trava de segurança: a cortina sai mesmo se algo travar o timeline
  gsap.delayedCall(3.6, () => {
    if (pre.style.display !== 'none') {
      tl.kill();
      gsap.to(pre, { yPercent: -100, duration: 0.5, onComplete: () => (pre.style.display = 'none') });
    }
  });

  return 2.5; // início da entrada do hero (mesmo timing do original)
}

/* ── Hero: letras do nome, linhas do título e parágrafo ────────── */
function heroIntro(at: number) {
  const letters = $('[data-hero-letter]');
  const lines = $('[data-hero-line]');
  const fades = $('[data-hero-fade]');
  const photo = $('[data-hero-photo]');
  if (!letters.length) return;

  gsap.set(letters, { opacity: 0, yPercent: 105 });
  gsap.set(lines, { opacity: 0, yPercent: 110 });
  gsap.set(fades, { opacity: 0, y: 18 });
  gsap.set(photo, { opacity: 0, yPercent: 10 });

  const LETTER_DUR = 0.82;
  const LETTER_STAGGER = 0.052;
  const lettersEnd = LETTER_DUR + LETTER_STAGGER * (letters.length - 1);

  const tl = gsap.timeline({ delay: at });
  tl.to(letters, { opacity: 1, yPercent: 0, duration: LETTER_DUR, ease: EASE, stagger: LETTER_STAGGER }, 0)
    .to(lines, { opacity: 1, yPercent: 0, duration: 0.82, ease: EASE, stagger: 0.08 }, 0.2)
    .to(fades, { opacity: 1, y: 0, duration: 0.82, ease: EASE }, 0.4)
    // retrato só entra quando o nome já está legível, para o nome ser lido primeiro
    .to(photo, { opacity: 1, yPercent: 0, duration: 1.2, ease: EASE }, lettersEnd - 0.2);
}

/* ── Reveals: cada [data-anim] sobe 28px ao entrar na tela ─────── */
function reveals() {
  const els = $('[data-anim]');
  els.forEach((el) => {
    const group = el.closest('[data-anim-group]');
    const idx = group ? $('[data-anim]', group).indexOf(el) : 0;
    const delay = Math.min(idx, 8) * 0.09;

    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: EASE,
        delay,
        scrollTrigger: { trigger: el, start: 'top 94%', once: true },
      },
    );
  });
}

/* ── Marquee: faixa infinita (o conteúdo está duplicado no HTML) ── */
function marquee() {
  const track = document.querySelector<HTMLElement>('[data-marquee]');
  if (!track) return;
  gsap.to(track, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
}

/* ── Âncoras: scroll suave até a seção ao clicar nos links da nav ─ */
function smoothAnchors() {
  const nav = document.querySelector<HTMLElement>('[data-nav] nav');
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href')!.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    // a seção para logo abaixo do cabeçalho fixo, não escondida atrás dele
    const offsetY = id === 'top' ? 0 : (nav?.offsetHeight ?? 0);
    // sem autoKill: no Safari iOS a barra de endereço recolhe no início do scroll e
    // desloca a página sozinha, o que o autoKill interpretava como interrupção do usuário
    gsap.to(window, { scrollTo: { y: target, offsetY, autoKill: false }, duration: 1.1, ease: EASE });
  });
}

/* ── Boot ───────────────────────────────────────────────────────── */
const mm = gsap.matchMedia();

// recarregou sem #hash: começa do topo (scrollRestoration=manual está no <head>)
if (!location.hash) window.scrollTo(0, 0);

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const heroAt = preloader();
  heroIntro(heroAt);
  reveals();
  marquee();
  smoothAnchors();
  ScrollTrigger.refresh();
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  // sem movimento: tudo visível de imediato
  gsap.set('[data-anim], [data-hero-letter], [data-hero-line], [data-hero-fade], [data-hero-photo]', { clearProps: 'all', opacity: 1 });
});

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ============================================================
   UTILITY — safely query elements, skip if not found
   ============================================================ */
const q = (selector, scope = document) => scope.querySelector(selector);
const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];


/* ============================================================
   1. HERO SECTION
   ============================================================ */
export function animateHero() {
  const section = q(".hero-bg");
  if (!section) return;

  const container = q(".hero-bg .container");
  const heading   = q("h1", container);
  const para      = q("p",  container);
  const btn       = q("a",  container);

  // Set initial states
  gsap.set(container, { opacity: 0, y: 60, scale: 0.97 });
  gsap.set(heading,   { opacity: 0, y: 40, letterSpacing: "0.25em" });
  gsap.set(para,      { opacity: 0, y: 30 });
  gsap.set(btn,       { opacity: 0, y: 20, scale: 0.9 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(container, { opacity: 1, y: 0, scale: 1,        duration: 1.1 })
    .to(heading,   { opacity: 1, y: 0, letterSpacing: "0em", duration: 0.9 }, "-=0.7")
    .to(para,      { opacity: 1, y: 0,                        duration: 0.7 }, "-=0.5")
    .to(btn,       { opacity: 1, y: 0, scale: 1,              duration: 0.6 }, "-=0.4");

  // Subtle parallax on the hero section background
  gsap.to(section, {
    backgroundPositionY: "30%",
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Floating pulse on the CTA button (infinite loop)
  gsap.to(btn, {
    y: -6,
    duration: 1.4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 1.8,
  });

  return tl;
}


/* ============================================================
   2. FOUNDER'S NOTE SECTION
   ============================================================ */
export function animateFounderNote() {
  const section   = q("#founder-note");
  if (!section) return;

  const overlay   = q(".absolute.inset-0", section);
  const image     = q("img", section);
  const nameTitle = q("h3",  section);
  const subtitle  = q("p.italic", section);
  const border    = q(".border-l-4", section);
  const quote     = q("p",  border);

  // Initial states
  gsap.set(overlay,   { opacity: 0 });
  gsap.set(image,     { opacity: 0, scale: 1.15, rotation: -4 });
  gsap.set(nameTitle, { opacity: 0, y: 24 });
  gsap.set(subtitle,  { opacity: 0, y: 16 });
  gsap.set(border,    { scaleY: 0, transformOrigin: "top center", opacity: 0 });
  gsap.set(quote,     { opacity: 0, y: 30 });

  ScrollTrigger.create({
    trigger: section,
    start: "top 75%",
    onEnter: () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(overlay,   { opacity: 1,                            duration: 0.5 })
        .to(image,     { opacity: 1, scale: 1, rotation: 0,    duration: 1.1 }, "-=0.3")
        .to(nameTitle, { opacity: 1, y: 0,                     duration: 0.7 }, "-=0.6")
        .to(subtitle,  { opacity: 1, y: 0,                     duration: 0.5 }, "-=0.4")
        .to(border,    { scaleY: 1, opacity: 1,                duration: 0.8, ease: "power2.out" }, "-=0.3")
        .to(quote,     { opacity: 1, y: 0,                     duration: 0.9 }, "-=0.5");
    },
    once: true,
  });

  // Slow zoom-out parallax on the parchment background
  gsap.to(section, {
    backgroundSize: "115%",
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });
}


/* ============================================================
   3. MISSION / THREE PILLARS SECTION
   ============================================================ */
export function animateMission() {
  const section = q("#mission");
  if (!section) return;

  const heading = q("h2", section);
  const cards   = qa(".grid > div", section);

  // Heading slide-in from left
  gsap.set(heading, { opacity: 0, x: -50 });
  ScrollTrigger.create({
    trigger: heading,
    start: "top 85%",
    onEnter: () =>
      gsap.to(heading, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }),
    once: true,
  });

  // Cards staggered reveal with 3-D tilt entrance
  cards.forEach((card, i) => {
    gsap.set(card, {
      opacity: 0,
      y: 80,
      rotationX: 20,
      transformPerspective: 900,
      transformOrigin: "top center",
    });

    ScrollTrigger.create({
      trigger: card,
      start: "top 88%",
      onEnter: () =>
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: "power3.out",
        }),
      once: true,
    });

    // Hover lift effect (add / remove listeners)
    const enterHandler = () =>
      gsap.to(card, { y: -10, scale: 1.025, duration: 0.35, ease: "power2.out",
        boxShadow: "0 20px 50px rgba(0,0,0,.18)" });
    const leaveHandler = () =>
      gsap.to(card, { y: 0,  scale: 1,     duration: 0.35, ease: "power2.inOut",
        boxShadow: "" });

    card.addEventListener("mouseenter", enterHandler);
    card.addEventListener("mouseleave", leaveHandler);
  });

  // Subtle background color shift on scroll
  gsap.to(section, {
    backgroundColor: "#eef0cc",
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top center",
      end: "bottom center",
      scrub: 2,
    },
  });
}


/* ============================================================
   4. CARD BADGE ORBIT SPIN (continuous — decorative rings)
   ============================================================ */
export function animateBadgeOrbits() {
  // Each card has outer + inner orbit rings; spin them at different speeds
  qa(".grid > div").forEach((card) => {
    const [outer, inner] = qa("[style*='dashed'], [style*='border: 1px solid']", card);

    if (outer)
      gsap.to(outer, { rotation: 360,  duration: 18, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    if (inner)
      gsap.to(inner, { rotation: -360, duration: 10, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
  });
}


/* ============================================================
   5. SMOOTH SCROLL for anchor link in Hero
   ============================================================ */
export function smoothScrollCTA() {
  const btn = q('a[href="#founder-note"]');
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 1.4,
      scrollTo: { y: "#founder-note", offsetY: 0 },
      ease: "power3.inOut",
    });
  });
}


/* ============================================================
   6. FOOTER FADE-IN (optional — reuse for Footer component)
   ============================================================ */
export function animateFooter() {
  const footer = q("footer");
  if (!footer) return;

  gsap.set(footer, { opacity: 0, y: 30 });
  ScrollTrigger.create({
    trigger: footer,
    start: "top 95%",
    onEnter: () =>
      gsap.to(footer, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
    once: true,
  });
}


/* ============================================================
   MASTER INIT — call this once inside Home's useEffect
   ============================================================ */
export function initHomeAnimations() {
  // Small delay to let React finish painting the DOM
  const ctx = gsap.context(() => {
    animateHero();
    animateFounderNote();
    animateMission();
    animateBadgeOrbits();
    smoothScrollCTA();
    animateFooter();
  });

  // Return cleanup so ScrollTriggers are killed on unmount
  return () => ctx.revert();
}
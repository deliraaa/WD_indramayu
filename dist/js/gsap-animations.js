/**
 * ═══════════════════════════════════════════════════════
 *  GSAP + ScrollTrigger — Skill Exchange Landing Page
 *  Vanilla JS | Tailwind CSS 4 Compatible
 * ═══════════════════════════════════════════════════════
 */

document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // ─── PERFORMANCE CONFIG ─────────────────────────────
  ScrollTrigger.config({ limitCallbacks: true });

  // ─── 1. SCROLL REVEAL GLOBAL (.reveal-up) ──────────
  // Deteksi semua elemen dengan class .reveal-up
  // Memberikan efek fade-in + slide-up saat masuk viewport
  const revealElements = document.querySelectorAll(".reveal-up");

  revealElements.forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });

  // ─── 2. STAGGER EFFECT (.reveal-stagger) ───────────
  // Deteksi parent dengan class .reveal-stagger
  // Animasi semua elemen anak langsung secara berurutan
  const staggerContainers = document.querySelectorAll(".reveal-stagger");

  staggerContainers.forEach((container) => {
    const children = container.children;

    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        once: true,
      },
    });
  });

  // ─── 3. NAVBAR GLASSMORPHISM ───────────────────────
  // Navbar berubah ke glassmorphism saat scroll > 50px
  const navbar = document.getElementById("navbar");

  if (navbar) {
    // Set initial state
    gsap.set(navbar, { backgroundColor: "transparent" });

    ScrollTrigger.create({
      start: "top -50",
      onUpdate: (self) => {
        if (self.scroll() > 50) {
          // Aktifkan glassmorphism (tanpa fixed)
          navbar.classList.add("shadow-md");
          navbar.style.backdropFilter = "blur(12px)";
          navbar.style.webkitBackdropFilter = "blur(12px)";
          navbar.style.backgroundColor = "rgba(255, 255, 255, 0.75)";
        } else {
          // Kembali ke transparent
          navbar.classList.remove("shadow-md");
          navbar.style.backdropFilter = "none";
          navbar.style.webkitBackdropFilter = "none";
          navbar.style.backgroundColor = "transparent";
        }
      },
    });
  }

  // ─── 4. HERO SECTION — SPECIAL ANIMATION ───────────
  // Animasi premium khusus hero: lebih cepat, power4.out
  const heroSection = document.getElementById("hero");

  if (heroSection) {
    const heroTimeline = gsap.timeline({
      defaults: { duration: 1.2, ease: "power4.out" },
    });

    const heroH1 = heroSection.querySelector(".headline");
    const heroP = heroSection.querySelector(".pragraf");
    const heroBtnGroup = heroSection.querySelector(".btn-group");
    const heroTrust = heroSection.querySelector(".flex.gap-2.mt-5:last-of-type");
    const heroImage = heroSection.querySelector(".col-span-5 img");

    // Reset hero elements for timeline (override .reveal-up initial state)
    const heroEls = [heroH1, heroP, heroBtnGroup, heroTrust].filter(Boolean);
    gsap.set(heroEls, { opacity: 0, y: 60 });

    heroTimeline
      .to(heroH1, { y: 0, opacity: 1 }, 0.2)
      .to(heroP, { y: 0, opacity: 1 }, 0.4)
      .to(heroBtnGroup, { y: 0, opacity: 1 }, 0.6)
      .to(heroTrust, { y: 0, opacity: 1 }, 0.8);

    // Hero image — fade in from right
    if (heroImage) {
      gsap.set(heroImage, { opacity: 0, x: 80 });
      heroTimeline.to(
        heroImage,
        { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
        0.3
      );
    }
  }

  // ─── 5. LENIS + SCROLLTRIGGER SYNC ─────────────────
  // Sinkronisasi Lenis smooth scroll dengan ScrollTrigger
  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis();

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Refresh ScrollTrigger setelah semua aset selesai dimuat
    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }

  // ─── 6. PERFORMANCE: will-change cleanup ───────────
  // Hapus will-change setelah animasi selesai (hemat memory)
  ScrollTrigger.addEventListener("scrollEnd", () => {
    document.querySelectorAll(".reveal-up, .reveal-stagger > *").forEach((el) => {
      if (parseFloat(getComputedStyle(el).opacity) === 1) {
        el.style.willChange = "auto";
      }
    });
  });
});

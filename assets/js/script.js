/* ============================================================
   LithoQuant - main.js
   Navbar, scroll systems (depth rail, progress, reveals),
   animated counters, live ticker, showcase tabs, lightbox,
   greeting, calm mode. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  const doc = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     1. Navbar: scrolled state + active link + mobile menu
     ---------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  function onScrollNav() {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 24);
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      hamburger.classList.toggle("active", open);
      hamburger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    navMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      })
    );
  }

  /* ----------------------------------------------------------
     2. Depth rail (signature): scroll progress as measured depth
     ---------------------------------------------------------- */
  const rail = document.getElementById("depth-rail");
  const railFill = rail ? rail.querySelector(".rail-fill") : null;
  const railReadout = rail ? rail.querySelector(".rail-readout") : null;
  const TD_FT = 15000; // total depth the page represents

  function fmtFt(v) {
    return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " FT";
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (railFill) railFill.style.height = (p * 100).toFixed(2) + "%";
      if (railReadout) railReadout.textContent = fmtFt(p * TD_FT);
      if (rail) rail.classList.toggle("visible", window.scrollY > 300);
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 700);
      onScrollNav();
      ticking = false;
    });
  }

  /* ----------------------------------------------------------
     3. Back to top + calm mode
     ---------------------------------------------------------- */
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    );
  }

  const comfortBtn = document.getElementById("comfort-toggle");
  if (comfortBtn) {
    const label = comfortBtn.querySelector("span");
    const apply = (on) => {
      doc.classList.toggle("calm", on);
      comfortBtn.classList.toggle("on", on);
      if (label) label.textContent = on ? "Calm on" : "Calm";
      comfortBtn.setAttribute("aria-pressed", String(on));
    };
    comfortBtn.addEventListener("click", () => apply(!doc.classList.contains("calm")));
    if (reduceMotion) apply(true);
  }

  /* ----------------------------------------------------------
     4. Scroll reveals (staggered via --d)
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ----------------------------------------------------------
     5. Animated counters
     ---------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const dur = 1600;
    const t0 = performance.now();
    function frame(t) {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
    }
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
    } else {
      requestAnimationFrame(frame);
    }
  }
  if ("IntersectionObserver" in window && counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            cio.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  }

  /* ----------------------------------------------------------
     6. Hero greeting (time-aware, typed)
     ---------------------------------------------------------- */
  const greeting = document.getElementById("hero-greeting");
  if (greeting) {
    const h = new Date().getHours();
    const word =
      h < 11 ? "Good morning" : h < 15 ? "Good afternoon" : h < 19 ? "Good evening" : "Working late";
    const text = "// " + word + ", explorer. Depth awaits.";
    if (reduceMotion) {
      greeting.textContent = text;
    } else {
      let i = 0;
      (function type() {
        if (i <= text.length) {
          greeting.innerHTML =
            text.slice(0, i) + '<span class="cursor" aria-hidden="true"></span>';
          i++;
          setTimeout(type, 34);
        } else {
          greeting.innerHTML = text;
        }
      })();
    }
  }

  /* ----------------------------------------------------------
     7. Live ticker (simulated log feed)
     ---------------------------------------------------------- */
  const tickerTrack = document.getElementById("ticker-track");
  if (tickerTrack) {
    const curves = [
      { k: "GR", u: "API", min: 20, max: 140, d: 1 },
      { k: "RDEP", u: "ohm.m", min: 0.5, max: 90, d: 2 },
      { k: "DEN", u: "g/cc", min: 1.9, max: 2.65, d: 3 },
      { k: "NPHI", u: "v/v", min: 0.05, max: 0.45, d: 3 },
      { k: "DT", u: "us/ft", min: 55, max: 120, d: 1 },
      { k: "PHIE", u: "v/v", min: 0.04, max: 0.3, d: 3 },
      { k: "SW", u: "dec", min: 0.15, max: 0.95, d: 2 },
      { k: "PERM", u: "mD", min: 0.1, max: 480, d: 1 },
    ];
    let depth = 4218;
    function sample() {
      depth += Math.floor(Math.random() * 9);
      const items = [
        '<span class="tk-depth"><i class="fas fa-arrows-down-to-line" aria-hidden="true"></i> DEPTH ' +
          fmtFt(depth).replace(" FT", " ft") +
          "</span>",
      ];
      for (let i = 0; i < 4; i++) {
        const c = curves[Math.floor(Math.random() * curves.length)];
        const v = (c.min + Math.random() * (c.max - c.min)).toFixed(c.d);
        const up = Math.random() > 0.5;
        items.push(
          "<span>" +
            c.k +
            ' <strong class="' +
            (up ? "tk-up" : "tk-dn") +
            '">' +
            (up ? "&#9650;" : "&#9660;") +
            " " +
            v +
            "</strong> " +
            c.u +
            "</span>"
        );
      }
      return items.join("");
    }
    // duplicate content for a seamless -50% loop
    const half = document.createElement("span");
    half.style.display = "inline-flex";
    half.style.gap = "44px";
    half.innerHTML = sample() + sample() + sample();
    tickerTrack.appendChild(half);
    const half2 = half.cloneNode(true);
    tickerTrack.appendChild(half2);
    if (!reduceMotion) {
      setInterval(() => {
        half.innerHTML = sample() + sample() + sample();
      }, 9000);
    }
  }

  /* ----------------------------------------------------------
     8. Hero depth readout (rides the scanline timing)
     ---------------------------------------------------------- */
  const scanChip = document.getElementById("scan-chip");
  if (scanChip && !reduceMotion) {
    setInterval(() => {
      scanChip.textContent = fmtFt(3800 + Math.floor(Math.random() * 900));
    }, 1400);
  }

  /* ----------------------------------------------------------
     9. Showcase tabs (home) + developer tabs
     ---------------------------------------------------------- */
  function bindTabs(btnSel, paneSel, activeBtn, activePane, onChange) {
    const btns = document.querySelectorAll(btnSel);
    const panes = document.querySelectorAll(paneSel);
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove(activeBtn));
        panes.forEach((p) => p.classList.remove(activePane));
        btn.classList.add(activeBtn);
        const pane = document.getElementById(btn.dataset.tab);
        if (pane) pane.classList.add(activePane);
        if (onChange) onChange(btn, pane);
      });
    });
  }

  // showcase with image swap
  const viewerImg = document.getElementById("viewer-img");
  const viewerFrame = document.getElementById("viewer-frame");
  const viewerCap = document.getElementById("viewer-cap");
  if (viewerImg && viewerFrame) {
    bindTabs(
      ".showcase-tab",
      ".showcase-tab",
      "active",
      "active",
      (btn) => {
        const src = btn.dataset.img;
        const cap = btn.dataset.cap;
        viewerFrame.classList.add("switching");
        setTimeout(() => {
          viewerImg.src = src;
          viewerImg.alt = btn.querySelector("h4").textContent;
          if (viewerCap && cap) viewerCap.textContent = cap;
          viewerFrame.classList.remove("switching");
        }, 220);
      }
    );
  }

  // developer page tabs
  if (document.querySelector(".tab-navigation")) {
    bindTabs(".tab-btn", ".tab-pane", "active", "active");
  }

  /* ----------------------------------------------------------
     10. Lightbox (showcase expand + gallery)
     ---------------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    function open(src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "Preview";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    document.querySelectorAll("[data-lightbox]").forEach((el) => {
      el.addEventListener("click", () => {
        const img = el.tagName === "IMG" ? el : el.querySelector("img");
        if (img) open(img.src, img.alt);
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) close();
    });
  }

  /* ----------------------------------------------------------
     11. Newsletter (demo submit)
     ---------------------------------------------------------- */
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = document.querySelector(".newsletter-note");
      if (note) note.textContent = "// Thanks - you are on the list. No spam, only releases.";
      newsletterForm.reset();
    });
  }

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();

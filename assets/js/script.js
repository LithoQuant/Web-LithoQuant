/* ============================================================
   LithoQuant - main.js
   Navbar, scroll reveals, showcase tabs, lightbox, theme preference,
   and reduced-motion control. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  const doc = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     0. Theme Switcher (Professional Light / Dark)
     ---------------------------------------------------------- */
  const savedTheme = localStorage.getItem("lithoquant-theme");
  if (savedTheme === "dark") {
    doc.setAttribute("data-theme", "dark");
  } else if (savedTheme === "brutalism") {
    localStorage.removeItem("lithoquant-theme");
  }

  function updateThemeButtons(theme) {
    const isDark = theme === "dark";
    const label = isDark ? "Switch to light theme" : "Switch to dark theme";
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      const text = btn.querySelector(".toggle-text");
      const icon = btn.querySelector(".toggle-icon");
      if (text) text.textContent = isDark ? "Light" : "Dark";
      if (icon) icon.className = `toggle-icon fas ${isDark ? "fa-sun" : "fa-moon"}`;
      btn.setAttribute("aria-label", label);
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("title", label);
    });
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isDark ? "#0c1713" : "#f5f7f4";
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = doc.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        if (next === "light") {
          doc.removeAttribute("data-theme");
          localStorage.removeItem("lithoquant-theme");
        } else {
          doc.setAttribute("data-theme", next);
          localStorage.setItem("lithoquant-theme", next);
        }
        updateThemeButtons(next);
      });
    });
    updateThemeButtons(doc.getAttribute("data-theme") || "default");
  });

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
     2. Back to top
     ---------------------------------------------------------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 700);
      onScrollNav();
      ticking = false;
    });
  }

  /* ----------------------------------------------------------
     3. Reduced-motion control
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
      if (label) label.textContent = on ? "Motion reduced" : "Reduce motion";
      comfortBtn.setAttribute("aria-pressed", String(on));
      comfortBtn.setAttribute("aria-label", on ? "Turn off reduced motion" : "Reduce motion");
      comfortBtn.setAttribute("title", on ? "Turn off reduced motion" : "Reduce motion");
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
     5. Showcase tabs (home) + developer tabs
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
     6. Lightbox (showcase expand + gallery)
     ---------------------------------------------------------- */
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    let lastTrigger = null;
    function open(src, alt, trigger) {
      lastTrigger = trigger;
      lbImg.src = src;
      lbImg.alt = alt || "Preview";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    }
    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastTrigger) lastTrigger.focus();
      lastTrigger = null;
    }
    document.querySelectorAll("[data-lightbox]").forEach((el) => {
      const openElement = () => {
        const img = el.tagName === "IMG" ? el : el.querySelector("img");
        const trigger = el.matches("button, a, [role='button'], [tabindex]")
          ? el
          : el.querySelector("button") || el;
        if (img) open(img.src, img.alt, trigger);
      };
      el.addEventListener("click", openElement);
      if (el.getAttribute("role") === "button") {
        el.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openElement();
          }
        });
      }
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "Tab" && closeBtn) {
        event.preventDefault();
        closeBtn.focus();
      }
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("open")) close();
    });
  }

  /* ----------------------------------------------------------
     7. Newsletter (demo submit)
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

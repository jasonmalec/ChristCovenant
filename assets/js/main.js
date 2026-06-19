/* =========================================================================
   Resurgens — shared site behavior
   - Mobile nav toggle
   - Scroll reveal animations
   - Active nav link highlighting
   - Lightweight analytics hooks (page views, scroll depth, CTA clicks,
     downloads) — logged to the console and pushed to window.dataLayer so a
     real analytics tool (GA4, Plausible, Fathom) can be wired in later by
     dropping its snippet into the <head>. No tracking is sent anywhere yet.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Active nav link ---------- */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href === here || (here === "index.html" && href === "./") ) {
      if (!a.classList.contains("nav__cta")) a.classList.add("is-active");
    }
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Analytics hooks ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(event, detail) {
    var payload = Object.assign({ event: event, ts: Date.now(), path: location.pathname }, detail || {});
    window.dataLayer.push(payload);
    if (window.console && console.debug) console.debug("[analytics]", payload);
  }
  // Page view
  track("page_view", { title: document.title });

  // CTA + download clicks (any element with data-track)
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    track(el.getAttribute("data-track") || "click", {
      label: el.getAttribute("data-track-label") || el.textContent.trim().slice(0, 60),
      audience: el.getAttribute("data-audience") || null
    });
  });

  // Scroll depth (25/50/75/100) — useful on the home one-pager
  var marks = { 25: false, 50: false, 75: false, 100: false };
  function onScroll() {
    var h = document.documentElement;
    var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight || 1) * 100;
    [25, 50, 75, 100].forEach(function (m) {
      if (!marks[m] && scrolled >= m) { marks[m] = true; track("scroll_depth", { percent: m }); }
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.__track = track; // exposed for the gate
})();

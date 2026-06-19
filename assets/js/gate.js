/* =========================================================================
   Resurgens — simple shared-password gate for the "For leaders" area
   -------------------------------------------------------------------------
   This is a LIGHTWEIGHT alignment gate, not bank-grade security. It keeps the
   leader materials off the open web and behind one shared password while the
   campaign narrative is being set (Phase 0). The page is also set to noindex.
   For anything truly sensitive, host the file downloads behind real auth.

   HOW TO CHANGE THE PASSWORD (non-developer friendly):
   1. Pick a new password.
   2. Get its SHA-256 hash. Easiest way: open this page, then in the browser
      console type:   await sha256('your-new-password')
      ...and copy the long string it prints.
   3. Paste that string between the quotes on the PASSWORD_HASH line below.

   Current default password: resurgens2026
   ========================================================================= */
(function () {
  "use strict";

  var PASSWORD_HASH = "fdf0856f367874ab62df6fb4f8151b946408c34529fc85a48cdc3e92cf6c0cc1";
  var STORAGE_KEY = "resurgens_leader_access";

  async function sha256(str) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(function (b) {
      return b.toString(16).padStart(2, "0");
    }).join("");
  }
  window.sha256 = sha256; // handy for regenerating the hash

  var gate = document.getElementById("gate");
  var content = document.getElementById("gated-content");
  var form = document.getElementById("gate-form");
  var input = document.getElementById("gate-pass");
  var err = document.getElementById("gate-err");

  function unlock() {
    if (gate) gate.classList.add("is-hidden");
    if (content) content.classList.remove("is-hidden");
    if (window.__track) window.__track("gate_unlock", {});
  }

  // Already unlocked this session?
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") unlock();
  } catch (e) {}

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      err.textContent = "";
      var val = (input.value || "").trim();
      if (!val) { err.textContent = "Please enter the access password."; return; }
      var hash;
      try { hash = await sha256(val); } catch (e2) { err.textContent = "This browser can't verify the password."; return; }
      if (hash === PASSWORD_HASH) {
        try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (e3) {}
        unlock();
      } else {
        err.textContent = "That password isn't right. Check the link or note you were sent.";
        input.select();
        if (window.__track) window.__track("gate_fail", {});
      }
    });
  }
})();

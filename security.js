(() => {
  "use strict";

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* ===============================
     RIGHT CLICK (desktop only)
  =============================== */
  if (!isMobile) {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  /* ===============================
     COPY PROTECTION (SOFT)
     - allow on mobile for usability
  =============================== */
  if (!isMobile) {
    ["copy", "cut"].forEach(evt => {
      document.addEventListener(evt, (e) => e.preventDefault());
    });
  }

  /* ===============================
     TEXT SELECTION
     - DON'T block mobile selection (important fix)
  =============================== */
  if (!isMobile) {
    document.addEventListener("selectstart", (e) => e.preventDefault());
  }

  /* ===============================
     DRAGGING
  =============================== */
  document.addEventListener("dragstart", (e) => e.preventDefault());

  /* ===============================
     DEVTOOLS SHORTCUTS (desktop only)
  =============================== */
  document.addEventListener("keydown", function (e) {
    if (isMobile) return;

    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });

  /* ===============================
     DEVTOOLS DETECTION (less aggressive)
  =============================== */
  let devtoolsOpen = false;

  setInterval(() => {
    if (isMobile) return;

    const widthDiff = window.outerWidth - window.innerWidth;

    if (widthDiff > 200) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        softWarning();
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1500);

  /* ===============================
     SOFT WARNING (lighter UI)
  =============================== */
  function softWarning() {
    const overlay = document.createElement("div");

    overlay.style.cssText = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.75);
      backdrop-filter: blur(4px);
      z-index:999999;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      color:#fff;
      font-family:sans-serif;
      text-align:center;
      padding:20px;
    `;

    overlay.innerHTML = `
      <h2 style="color:#C9956A;margin-bottom:10px;">Security Notice</h2>
      <p style="opacity:0.8;max-width:300px;font-size:14px;">
        Developer tools detected. Content is protected for presentation only.
      </p>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 2000);
  }

  /* ===============================
     TAB SWITCH EFFECT (reduced)
  =============================== */
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      document.body.style.filter = "blur(2px)";
    } else {
      document.body.style.filter = "none";
    }
  });

})();
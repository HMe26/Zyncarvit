/* =========================================================
   OvaBalance Max – Frontend Protection Layer
   ⚠️ NOTE: This is deterrence only, not real security
========================================================= */

(() => {
  "use strict";

/* ===============================
   DISABLE RIGHT CLICK
=============================== */
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

/* ===============================
   DISABLE COPY / CUT / PASTE
=============================== */
["copy", "cut", "paste"].forEach(evt => {
  document.addEventListener(evt, (e) => {
    e.preventDefault();
  });
});

/* ===============================
   DISABLE TEXT SELECTION
=============================== */
document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});

/* ===============================
   DISABLE DRAGGING
=============================== */
document.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

/* ===============================
   BLOCK COMMON DEVTOOLS SHORTCUTS
=============================== */
document.addEventListener("keydown", function (e) {

  // F12
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }

  // Ctrl + Shift + I / J / C
  if (
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U") // view source
  ) {
    e.preventDefault();
    return false;
  }

});

/* ===============================
   DETECT DEVTOOLS OPEN (heuristic)
=============================== */
let devtoolsOpen = false;

setInterval(() => {
  const threshold = 160;

  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;

  if (widthDiff > threshold || heightDiff > threshold) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      triggerWarning();
    }
  } else {
    devtoolsOpen = false;
  }
}, 1000);

/* ===============================
   WARNING OVERLAY (soft block)
=============================== */
function triggerWarning() {

  const overlay = document.createElement("div");

  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.85)";
  overlay.style.backdropFilter = "blur(10px)";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.flexDirection = "column";
  overlay.style.color = "#fff";
  overlay.style.fontFamily = "sans-serif";
  overlay.innerHTML = `
    <h1 style="color:#C9956A; margin-bottom:10px;">Security Notice</h1>
    <p style="opacity:0.8; text-align:center; max-width:400px;">
      Developer tools detected. This content is protected for presentation purposes.
    </p>
  `;

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.remove();
  }, 3000);
}

/* ===============================
   DISABLE PRINT SCREEN ATTEMPT (weak heuristic)
=============================== */
document.addEventListener("keyup", (e) => {
  if (e.key === "PrintScreen") {
    navigator.clipboard.writeText("");
  }
});

/* ===============================
   BLUR CONTENT ON TAB SWITCH
=============================== */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.style.filter = "blur(6px)";
  } else {
    document.body.style.filter = "none";
  }
});

/* ===============================
   PREVENT TEXT DRAGGING VIA CSS INJECTION
=============================== */
const style = document.createElement("style");
style.innerHTML = `
  * {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
  }
`;
document.head.appendChild(style);

})();
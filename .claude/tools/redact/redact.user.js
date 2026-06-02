// ==UserScript==
// @name         Jamdesk · redact image in CleanShot
// @namespace    kapptivate.docs
// @description  Option-click any docs image to blur it in CleanShot X (via the local redact bridge).
// @match        http://localhost:3001/*
// @match        http://127.0.0.1:3001/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
(function () {
  "use strict";
  var PORT = 7777;

  // Map the rendered src ('/_jd/images/foo.webp', '/images/foo.webp', or a
  // '?url=' image proxy) back to the repo-relative '/images/foo.webp'.
  function imagePath(src) {
    try {
      var u = new URL(src, location.href);
      var p = u.searchParams.get("url") || u.pathname;
      p = decodeURIComponent(p);
      var i = p.indexOf("/images/");
      return i < 0 ? null : p.slice(i);
    } catch (e) {
      return null;
    }
  }

  document.addEventListener(
    "click",
    function (e) {
      var img = e.target.closest && e.target.closest("img");
      if (!img || !e.altKey) return; // Option/Alt-click only
      var path = imagePath(img.currentSrc || img.src);
      if (!path) return;
      e.preventDefault();
      e.stopPropagation();
      fetch("http://127.0.0.1:" + PORT + "/redact?path=" + encodeURIComponent(path))
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.ok) console.log("[redact] opening in CleanShot:", d.file);
          else console.warn("[redact] error:", d.error);
        })
        .catch(function () {
          alert(
            "Redact bridge not reachable on :" + PORT + ".\nStart it from the docs root:\n\n" +
            "uv run --with imageio-ffmpeg .claude/tools/redact/redact.py --serve"
          );
        });
    },
    true
  );

  console.log("[redact] ready — Option-click an image to blur it in CleanShot.");
})();

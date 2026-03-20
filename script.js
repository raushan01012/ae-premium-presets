// ═══════════════════════════════════════════════════════
//  RaushanExplains CC Packs — script.js
// ═══════════════════════════════════════════════════════

const PACK_INFO = {
  starter: { label: "Starter Pack — 10 CC Files", url: "success.html?pack=starter" },
  pro:     { label: "Pro Pack — 30 CC Files",     url: "success.html?pack=pro" }
};

// Pay button click karo → localStorage save → Razorpay open
function onPayClick(pack) {
  localStorage.setItem("raushan_pack", pack);
  // Banner sirf tab show hoga jab user wapas aayega
  // (Razorpay redirect ke baad)
}

function showBanner(pack) {
  var info   = PACK_INFO[pack];
  var banner = document.getElementById("dlBanner");
  var sub    = document.getElementById("dlBannerSub");
  var btn    = document.getElementById("dlBannerBtn");
  if (!banner) return;
  sub.textContent = info.label;
  btn.href        = info.url;
  banner.classList.add("show");
}

function closeBanner() {
  var b = document.getElementById("dlBanner");
  if (b) b.classList.remove("show");
  // localStorage clear karo — banner dubara nahi aayega
  localStorage.removeItem("raushan_pack");
}

// ── DOMContentLoaded ───────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {

  // Banner sirf tab show ho jab ?paid=1 URL mein ho
  // (Razorpay redirect ke baad aata hai)
  var params = new URLSearchParams(window.location.search);
  var isPaid = params.get("paid") === "1";
  var saved  = localStorage.getItem("raushan_pack");

  if (isPaid && saved && PACK_INFO[saved]) {
    setTimeout(function() { showBanner(saved); }, 600);
  }

  // ── Scroll reveal ──────────────────────────────────
  var els = document.querySelectorAll(".pack-card, .review-card, .step-item, .faq-item");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function(entries, o) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = "1";
            entry.target.style.transform = "translateY(0)";
            o.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    els.forEach(function(el, i) {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(20px)";
      el.style.transition = "opacity 0.45s ease " + (i * 0.05) + "s, transform 0.45s ease " + (i * 0.05) + "s";
      obs.observe(el);
    });
  }

  // ── Smooth scroll ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      var t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  // ── Nav scroll style ───────────────────────────────
  var nav = document.getElementById("mainNav");
  window.addEventListener("scroll", function() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

});
// ═══════════════════════════════════════════════════════
//  RaushanExplains CC Packs — script.js
// ═══════════════════════════════════════════════════════

const PACK_INFO = {
  starter: { label: "Starter Pack — 10 CC Files", url: "success.html?pack=starter" },
  pro:     { label: "Pro Pack — 30 CC Files",     url: "success.html?pack=pro"     }
};

// Called when user clicks a Pay button
function onPayClick(pack) {
  localStorage.setItem("raushan_pack", pack);
  // Show sticky download banner after short delay
  // (gives time for Razorpay tab to open)
  setTimeout(() => showBanner(pack), 900);
}

function showBanner(pack) {
  const info   = PACK_INFO[pack];
  const banner = document.getElementById("dlBanner");
  const sub    = document.getElementById("dlBannerSub");
  const btn    = document.getElementById("dlBannerBtn");
  if (!banner) return;
  sub.textContent = info.label;
  btn.href        = info.url;
  banner.classList.add("show");
}

function closeBanner() {
  document.getElementById("dlBanner")?.classList.remove("show");
  // Don't clear localStorage — user might need it after payment
}

// ── DOMContentLoaded ──────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // If user previously clicked pay → show banner after page loads
  const saved = localStorage.getItem("raushan_pack");
  if (saved && PACK_INFO[saved]) {
    setTimeout(() => showBanner(saved), 1200);
  }

  // ── Scroll reveal ──────────────────────────────────
  const els = document.querySelectorAll(".pack-card, .review-card, .step-item, .faq-item");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = "1";
            entry.target.style.transform = "translateY(0)";
            o.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    els.forEach((el, i) => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
      obs.observe(el);
    });
  }

  // ── Smooth scroll ──────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  // ── Nav scroll style ───────────────────────────────
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

});

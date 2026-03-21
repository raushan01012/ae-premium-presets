// ═══════════════════════════════════════════════════════
//  RaushanExplains CC Packs — script.js
// ═══════════════════════════════════════════════════════

var PACKS = {
  starter: { tag: "STARTER", price: "₹19", amount: "₹19 pay karo", wa: "Hi%20Raushan!%20Maine%20Starter%20CC%20Pack%20ke%20liye%20%E2%82%B919%20pay%20kiya%20hai.%20Screenshot%20attach%20kar%20raha%20hoon.%20Please%20download%20link%20do%20%F0%9F%99%8F" },
  pro:     { tag: "PRO",     price: "₹49", amount: "₹49 pay karo", wa: "Hi%20Raushan!%20Maine%20Pro%20CC%20Pack%20ke%20liye%20%E2%82%B949%20pay%20kiya%20hai.%20Screenshot%20attach%20kar%20raha%20hoon.%20Please%20download%20link%20do%20%F0%9F%99%8F" }
};

function openPayModal(pack) {
  var p = PACKS[pack];
  document.getElementById("modalPackTag").textContent  = p.tag;
  document.getElementById("modalPrice").textContent    = p.price;
  document.getElementById("modalAmount").textContent   = p.amount;
  document.getElementById("waPayBtn").href = "https://wa.me/919304286957?text=" + p.wa;
  document.getElementById("payModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closePayModal() {
  document.getElementById("payModal").classList.remove("show");
  document.body.style.overflow = "";
}

function closeModal(e) {
  if (e.target.id === "payModal") closePayModal();
}

function copyUPI() {
  var upi = "9304286957@ybl";
  navigator.clipboard.writeText(upi).then(function() {
    var btn = document.querySelector(".upi-copy");
    btn.textContent = "Copied!";
    btn.style.background = "#25d366";
    btn.style.color = "#000";
    setTimeout(function() {
      btn.textContent = "Copy";
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
}

// ── DOMContentLoaded ───────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {

  // Scroll reveal
  var els = document.querySelectorAll(".pack-card, .review-card, .step-item, .faq-item");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function(entries, o) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = "1";
          entry.target.style.transform = "translateY(0)";
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    els.forEach(function(el, i) {
      el.style.opacity    = "0";
      el.style.transform  = "translateY(20px)";
      el.style.transition = "opacity 0.45s ease " + (i*0.05) + "s, transform 0.45s ease " + (i*0.05) + "s";
      obs.observe(el);
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      var t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  // Nav scroll
  var nav = document.getElementById("mainNav");
  window.addEventListener("scroll", function() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  // Close modal on Escape
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closePayModal();
  });

});

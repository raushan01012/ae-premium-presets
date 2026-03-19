// ── Modal ─────────────────────────────────────────────────────────────
let currentPack = "starter";

function openModal(pack) {
  currentPack = pack;

  const isPro = pack === "pro";
  const amount = isPro ? "₹49" : "₹19";
  const packName = isPro ? "🔥 PRO PACK · ₹49" : "🎬 STARTER PACK · ₹19";
  const waMsg = isPro
    ? "Hi Raushan! Maine ₹49 pay kar diya Pro CC Pack (30 CCs) ke liye. Screenshot bhej raha/rahi hoon 🙏🎬"
    : "Hi Raushan! Maine ₹19 pay kar diya Starter CC Pack (10 CCs) ke liye. Screenshot bhej raha/rahi hoon 🙏🎬";

  // Update modal content
  document.getElementById("modalPill").textContent = packName;
  document.getElementById("modalAmount").textContent = amount;
  document.getElementById("payAmount").textContent = amount;
  document.getElementById("waLink").href =
    `https://wa.me/919304286957?text=${encodeURIComponent(waMsg)}`;

  // Reset upload state
  document.getElementById("fileText").textContent = "Tap to upload screenshot";
  document.getElementById("previewImg").style.display = "none";
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("submitBtn").textContent = "Submit Screenshot";
  document.getElementById("fileInput").value = "";

  // Open modal
  const overlay = document.getElementById("modalOverlay");
  overlay.style.display = "flex";
  requestAnimationFrame(() => overlay.classList.add("active"));
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("active");
  setTimeout(() => { overlay.style.display = "none"; document.body.style.overflow = ""; }, 220);
}

function closeSuccess() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("active");
  setTimeout(() => { overlay.style.display = "none"; document.body.style.overflow = ""; }, 220);
}

// Close on backdrop click
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// ── Copy UPI ──────────────────────────────────────────────────────────
function copyUPI() {
  navigator.clipboard.writeText("9304286957@ybl").then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = "Copied ✓";
    btn.style.background = "rgba(255,92,0,0.28)";
    setTimeout(() => { btn.textContent = "Copy"; btn.style.background = ""; }, 2000);
  });
}

// ── File Upload ───────────────────────────────────────────────────────
function handleFile(input) {
  const file = input.files[0];
  if (!file) return;

  document.getElementById("fileText").textContent = "✅ " + file.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById("previewImg");
    img.src = e.target.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);

  const btn = document.getElementById("submitBtn");
  btn.disabled = false;
  btn.textContent = "Submit Screenshot ✓";
}

// ── Submit ────────────────────────────────────────────────────────────
function submitPayment() {
  const input = document.getElementById("fileInput");
  if (!input.files[0]) return;

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Sending...";

  // Open WhatsApp with pack-specific message
  const isPro = currentPack === "pro";
  const msg = isPro
    ? "Hi Raushan! Maine ₹49 pay kar diya Pro CC Pack (30 CCs) ke liye. Screenshot bhej raha/rahi hoon. Please CC files bhej do 🙏🎬"
    : "Hi Raushan! Maine ₹19 pay kar diya Starter CC Pack (10 CCs) ke liye. Screenshot bhej raha/rahi hoon. Please CC files bhej do 🙏🎬";

  window.open(`https://wa.me/919304286957?text=${encodeURIComponent(msg)}`, "_blank");

  // Optional: Formspree email notification
  // Replace YOUR_FORMSPREE_ID with actual ID from formspree.io
  const formData = new FormData();
  formData.append("_subject", isPro ? "🔥 NEW PRO PACK PURCHASE · ₹49" : "🎬 NEW STARTER PACK PURCHASE · ₹19");
  formData.append("pack", isPro ? "Pro (30 CCs) - ₹49" : "Starter (10 CCs) - ₹19");
  formData.append("screenshot", input.files[0]);

  fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
    method: "POST", body: formData, headers: { Accept: "application/json" },
  })
    .then(() => showSuccess())
    .catch(() => showSuccess());
}

function showSuccess() {
  closeModal();
  setTimeout(() => {
    const overlay = document.getElementById("successOverlay");
    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("active"));
    document.body.style.overflow = "hidden";
  }, 280);
}

// ── Page init ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // Scroll reveal
  const els = document.querySelectorAll(".pack-card, .review-card, .step-item, .faq-item");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            o.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
      obs.observe(el);
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });

  // Nav scroll
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

});

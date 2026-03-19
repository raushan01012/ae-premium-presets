// ── Popup ────────────────────────────────────────────────────────────
function openPopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.style.display = "flex";
  requestAnimationFrame(() => overlay.classList.add("active"));
  document.body.style.overflow = "hidden";
}

function closePopup() {
  const overlay = document.getElementById("popupOverlay");
  overlay.classList.remove("active");
  setTimeout(() => { overlay.style.display = "none"; document.body.style.overflow = ""; }, 220);
}

function closeSuccess() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("active");
  setTimeout(() => { overlay.style.display = "none"; document.body.style.overflow = ""; }, 220);
}

document.getElementById("popupOverlay").addEventListener("click", function (e) {
  if (e.target === this) closePopup();
});

// ── UPI Copy ─────────────────────────────────────────────────────────
function copyUPI() {
  navigator.clipboard.writeText("9304286957@ybl").then(() => {
    const btn = document.querySelector(".copy-btn");
    btn.textContent = "Copied! ✓";
    btn.style.background = "rgba(255,107,53,0.28)";
    setTimeout(() => { btn.textContent = "Copy"; btn.style.background = ""; }, 2000);
  });
}

// ── File Upload ──────────────────────────────────────────────────────
function handleFile(input) {
  const file = input.files[0];
  if (!file) return;

  document.getElementById("uploadText").textContent = "✅ " + file.name;
  const previewImg = document.getElementById("previewImg");
  const reader = new FileReader();
  reader.onload = (e) => { previewImg.src = e.target.result; previewImg.style.display = "block"; };
  reader.readAsDataURL(file);

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = false;
  submitBtn.textContent = "Submit Screenshot ✓";
}

// ── Submit ───────────────────────────────────────────────────────────
function submitPayment() {
  const input = document.getElementById("screenshotInput");
  if (!input.files[0]) return;

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // WhatsApp pe message open karo
  const msg = encodeURIComponent(
    "Hi Raushan! Maine ₹19 pay kar diya After Effects CC Pack ke liye. Screenshot bhej raha/rahi hoon. Please CC files bhej do 🙏🎬"
  );
  window.open(`https://wa.me/919304286957?text=${msg}`, "_blank");

  // Formspree se email notification (optional)
  // Step 1: formspree.io pe free account banao
  // Step 2: YOUR_FORMSPREE_ID replace karo
  const formData = new FormData();
  formData.append("_subject", "🎬 New CC Pack Purchase - ₹19");
  formData.append("message", "Naya payment aaya hai! Screenshot attached.");
  formData.append("screenshot", input.files[0]);

  fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
    method: "POST", body: formData, headers: { Accept: "application/json" },
  })
  .then(() => showSuccess())
  .catch(() => showSuccess()); // even if formspree not set up, show success
}

function showSuccess() {
  closePopup();
  setTimeout(() => {
    const overlay = document.getElementById("successOverlay");
    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("active"));
    document.body.style.overflow = "hidden";
  }, 300);
}

// ── Scroll & Nav ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // Scroll reveal
  const els = document.querySelectorAll(".cc-card, .review, .step, .faq-item, .buy-card");
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
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );
    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s`;
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

  // Nav
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

});

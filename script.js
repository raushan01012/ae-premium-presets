// ═══════════════════════════════════════════════════════
//  RaushanExplains CC Packs — script.js
// ═══════════════════════════════════════════════════════

const RZP_LINKS = {
  starter: "https://rzp.io/rzp/a0LjelTq",
  pro: "https://rzp.io/rzp/k5mL0ArG"
};

function onPayClick(pack) {
  var url = RZP_LINKS[pack];

  if (!url) {
    alert("Payment link nahi mila.");
    return;
  }

  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
  // Scroll reveal
  var els = document.querySelectorAll(".pack-card, .review-card, .step-item, .faq-item");

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    els.forEach(function (el, i) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition =
        "opacity 0.45s ease " +
        i * 0.05 +
        "s, transform 0.45s ease " +
        i * 0.05 +
        "s";
      obs.observe(el);
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");

      if (!href || href === "#") return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Nav scroll style
  var nav = document.getElementById("mainNav");
  window.addEventListener(
    "scroll",
    function () {
      if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 20);
      }
    },
    { passive: true }
  );
});
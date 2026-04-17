const pages = [
  ["Home", "index.html"],
  ["Trainers", "trainers.html"],
  ["Membership", "membership.html"],
  ["Gallery", "gallery.html"],
  ["Reviews", "reviews.html"]
];

function pageName() {
  const p = location.pathname.replace(/\\/g, "/").split("/").pop() || "index.html";
  return p.toLowerCase();
}

function rel(path) {
  return path;
}

function buildHeader() {
  const current = pageName();
  const links = pages
    .map(([label, path]) => {
      const active = current === path.split("/").pop().toLowerCase() ? "aria-current=\"page\"" : "";
      return `<a ${active} href="${rel(path)}">${label}</a>`;
    })
    .join("");

  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header" id="siteHeader">
      <nav class="nav container" aria-label="Main navigation">
        <a class="brand" href="${rel("index.html")}">
          <span class="brand-mark">IE</span>
          <span>SAMPLE GYM</span>
        </a>
        <div class="nav-links">${links}</div>
        <div style="display:flex;gap:12px;align-items:center">
          <a href="${rel("membership.html")}" class="btn btn-primary join-btn">Join Now</a>
          <button class="mobile-toggle" aria-label="Open menu" id="mobileToggle">☰</button>
        </div>
      </nav>
      <aside class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
        ${links}
        <a href="${rel("membership.html")}" class="btn btn-primary">Join Now</a>
      </aside>
    </header>
  `;
}

function buildFooter() {
  return `
  <footer class="footer">
    <div class="container footer-grid">
      <section>
        <h3 class="gold" style="margin-top:0">SAMPLE GYM</h3>
        <p class="muted">Where Ordinary Ends.</p>
      </section>
      <section>
        <h3>Quick Links</h3>
        <p><a href="${rel("index.html")}">Home</a></p>
        <p><a href="${rel("trainers.html")}">Trainers</a></p>
        <p><a href="${rel("membership.html")}">Membership</a></p>
        <p><a href="${rel("gallery.html")}">Gallery</a></p>
        <p><a href="${rel("reviews.html")}">Reviews</a></p>
      </section>
      <section>
        <h3>Contact</h3>
        <p><a href="tel:+910000000000">+91-00000-00000</a></p>
        <p><a href="mailto:hello@samplegym.com">hello@samplegym.com</a></p>
        <p class="muted">45, Fitness Lane, Kondapur, Hyderabad</p>
      </section>
      <section>
        <h3>Hours</h3>
        <p class="muted">Mon-Sat: 5 AM - 11 PM</p>
        <p class="muted">Sun: 6 AM - 9 PM</p>
        <p class="muted">Instagram · Facebook · YouTube</p>
      </section>
    </div>
    <div class="container" style="margin-top:24px;color:#8f8f8f">© 2025 Sample Gym</div>
  </footer>`;
}

function buildDisclaimer() {
  return `<div class="disclaimer-modal" id="disclaimerModal" role="dialog" aria-modal="true" aria-labelledby="disclaimerTitle">
      <div class="disclaimer-card">
        <p class="eyebrow">Important Disclaimer</p>
        <h2 id="disclaimerTitle">Demo Website Notice</h2>
        <p>
          This is a demonstration website designed to showcase layout, design, and features.
          Some functionalities may be limited or inactive in this version.
          The final website will be fully functional, professionally refined, and customized according to your business requirements.
        </p>
        <div class="btn-row" style="margin-top:16px">
          <button class="btn btn-primary" id="closeDisclaimer" type="button">I Understand</button>
        </div>
      </div>
    </div>`;
}

function hydrateShell() {
  const shell = document.querySelector("[data-shell]");
  if (!shell) return;
  const isHomePage = pageName() === "index.html";
  shell.innerHTML = `${buildHeader()}<main id="main">${shell.innerHTML}</main>${buildFooter()}
    ${isHomePage ? buildDisclaimer() : ""}
    <a class="floating-wa" href="https://wa.me/910000000000?text=Hi!%20I'm%20interested%20in%20joining%20Sample%20Gym." aria-label="Chat on WhatsApp">WA</a>
    <button class="scroll-top" aria-label="Scroll to top" id="scrollTop">↑</button>
    <nav class="floating-mobile-bar" aria-label="Quick actions">
      <a href="tel:+910000000000">Call</a>
      <a href="${rel("membership.html")}">Join Now</a>
    </nav>
    <div id="toastRoot" style="position:fixed;right:16px;bottom:170px;z-index:1800"></div>`;
}

function toast(message, type = "info") {
  const root = document.getElementById("toastRoot");
  if (!root) return;
  const border = type === "error" ? "#ef4444" : type === "success" ? "#22c55e" : "#ffd700";
  const t = document.createElement("div");
  t.style.cssText = `background:#141414;border:1px solid #2a2a2a;border-left:4px solid ${border};padding:12px 14px;margin-top:8px;border-radius:8px;color:#fff;`;
  t.textContent = message;
  root.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

function initGlobal() {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("mobileNav");
  const toggle = document.getElementById("mobileToggle");
  const topBtn = document.getElementById("scrollTop");
  const disclaimerModal = document.getElementById("disclaimerModal");
  const closeDisclaimer = document.getElementById("closeDisclaimer");

  if (disclaimerModal) {
    document.body.style.overflow = "hidden";
    closeDisclaimer?.focus();
  }

  closeDisclaimer?.addEventListener("click", () => {
    disclaimerModal?.classList.add("hide");
    document.body.style.overflow = "";
  });

  toggle?.addEventListener("click", () => nav?.classList.toggle("open"));

  addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > 80) header?.classList.add("scrolled");
    else header?.classList.remove("scrolled");

    if (y > 400) topBtn?.classList.add("show");
    else topBtn?.classList.remove("show");
  });

  topBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("show")),
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.getAttribute("data-count") || 0);
    let started = false;
    const countObs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        const start = performance.now();
        const dur = 1100;
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1);
          el.textContent = Math.floor(target * p).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    countObs.observe(el);
  });

  initPageSpecific();
}

function initTrainerModal() {
  const modal = document.getElementById("trainerModal");
  if (!modal) return;
  const close = document.getElementById("trainerModalClose");

  const title = document.getElementById("trainerModalName");
  const role = document.getElementById("trainerModalRole");
  const bio = document.getElementById("trainerModalBio");
  const certs = document.getElementById("trainerModalCerts");
  const spec = document.getElementById("trainerModalSpec");

  const open = (card) => {
    title.textContent = card.dataset.name || "Coach";
    role.textContent = card.dataset.role || "";
    bio.textContent = card.dataset.bio || "";
    certs.textContent = card.dataset.certs || "";
    spec.textContent = card.dataset.spec || "";
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  };

  document.querySelectorAll("[data-trainer]").forEach((card) => {
    card.addEventListener("click", () => open(card));
  });

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  close?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

function initMembershipFlow() {
  const monthly = document.getElementById("priceMonthly");
  const annual = document.getElementById("priceAnnual");
  if (monthly && annual) {
    const cards = document.querySelectorAll("[data-monthly]");
    const swap = (isAnnual) => {
      cards.forEach((c) => {
        c.textContent = isAnnual ? c.getAttribute("data-annual") : c.getAttribute("data-monthly");
      });
    };
    monthly.addEventListener("click", () => swap(false));
    annual.addEventListener("click", () => swap(true));
  }

  const planSelect = document.getElementById("selectedPlan");
  const orderPlan = document.getElementById("orderPlan");
  const orderAmount = document.getElementById("orderAmount");

  document.querySelectorAll("[data-choose-plan]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const plan = btn.getAttribute("data-plan");
      const amount = btn.getAttribute("data-price");
      if (planSelect) planSelect.value = plan;
      if (orderPlan) orderPlan.textContent = plan;
      if (orderAmount) orderAmount.textContent = amount;
      document.getElementById("registration")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const form = document.getElementById("membershipForm");
  const paymentBlock = document.getElementById("paymentBlock");
  const successBlock = document.getElementById("successBlock");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    paymentBlock.hidden = false;
    paymentBlock.scrollIntoView({ behavior: "smooth", block: "center" });
    toast("Registration captured. Proceed to payment.", "success");
  });

  document.getElementById("payNow")?.addEventListener("click", () => {
    successBlock.hidden = false;
    successBlock.scrollIntoView({ behavior: "smooth", block: "center" });
    toast("Payment successful (demo mode).", "success");
  });
}

function initGallery() {
  const tabs = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-category]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");
      tabs.forEach((t) => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");
      items.forEach((item) => {
        item.hidden = filter !== "all" && item.getAttribute("data-category") !== filter;
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const image = document.getElementById("lightboxImage");
  const caption = document.getElementById("lightboxCaption");
  const close = document.getElementById("lightboxClose");

  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;
      image.src = img.src;
      image.alt = img.alt;
      caption.textContent = item.getAttribute("data-caption") || img.alt;
      lightbox.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  const closeBox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  };

  close?.addEventListener("click", closeBox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeBox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBox();
  });
}

function initReviewsForm() {
  const form = document.getElementById("reviewForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    toast("Review submitted. Thank you for sharing your story!", "success");
    form.reset();
  });
}

function initPageSpecific() {
  initTrainerModal();
  initMembershipFlow();
  initGallery();
  initReviewsForm();

  const slides = [...document.querySelectorAll(".testimonial-slide")];
  if (slides.length) {
    let i = 0;
    setInterval(() => {
      slides[i].hidden = true;
      i = (i + 1) % slides.length;
      slides[i].hidden = false;
    }, 4000);
  }
}

hydrateShell();
initGlobal();

window.IronEmpire = { toast };

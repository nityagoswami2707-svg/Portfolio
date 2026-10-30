/**
 * NITYA GOSWAMI — PORTFOLIO V2
 * Interactive Engine: Dynamic Motion, Rotating 3D Tabs, Certificate Lightbox & Actions
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Interactive Cursor Glow
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateGlow);
    };
    requestAnimationFrame(animateGlow);
  }

  // 2. Navigation Bar & Mobile Menu
  const topbar = document.getElementById("topbar");
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      topbar.classList.add("scrolled");
    } else {
      topbar.classList.remove("scrolled");
    }
  });

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      const bars = menuBtn.querySelectorAll(".menu-bar");
      if (open) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        const bars = menuBtn.querySelectorAll(".menu-bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      });
    });
  }

  // 3. ROTATING 3D TABS FOR CERTIFICATIONS
  const certTabs = document.querySelectorAll("#certTabs .rot-tab");
  const certCards = document.querySelectorAll("#certGrid .cert-card");

  certTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 3D Rotation Animation on Tab Click
      certTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
        t.style.transform = "perspective(600px) rotateY(0deg)";
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      tab.style.transform = "perspective(600px) rotateY(15deg) translateZ(12px) scale(1.05)";
      setTimeout(() => {
        tab.style.transform = "perspective(600px) rotateY(0deg) translateZ(12px) scale(1.04)";
      }, 300);

      const filter = tab.getAttribute("data-filter");

      // Filter and 3D flip animate cards
      certCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        const isVerified = card.getAttribute("data-verified") === "true";

        let show = false;
        if (filter === "all") {
          show = true;
        } else if (filter === "verified") {
          show = isVerified;
        } else if (filter === "hackathons") {
          show = cat === "hackathons";
        } else if (filter === "ai") {
          show = cat === "ai";
        } else if (filter === "cyber") {
          show = cat === "cyber";
        }

        if (show) {
          card.style.display = card.classList.contains("cert-featured") ? "grid" : "flex";
          card.style.opacity = "0";
          card.style.transform = "perspective(800px) rotateX(25deg) translateY(20px)";
          setTimeout(() => {
            card.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            card.style.opacity = "1";
            card.style.transform = "perspective(800px) rotateX(0deg) translateY(0)";
          }, 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. ROTATING TABS FOR PROJECTS
  const projectTabs = document.querySelectorAll("#projectFilterTabs .rot-tab");
  const projectCards = document.querySelectorAll(".projects-grid .project-card");

  projectTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      projectTabs.forEach((t) => {
        t.classList.remove("active");
        t.style.transform = "perspective(600px) rotateY(0deg)";
      });

      tab.classList.add("active");
      tab.style.transform = "perspective(600px) rotateY(-15deg) translateZ(10px) scale(1.05)";
      setTimeout(() => {
        tab.style.transform = "perspective(600px) rotateY(0deg) translateZ(12px) scale(1.04)";
      }, 300);

      const filter = tab.getAttribute("data-pfilter");
      projectCards.forEach((card) => {
        const cat = card.getAttribute("data-pcategory");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.transform = "perspective(800px) rotateY(20deg) scale(0.95)";
          setTimeout(() => {
            card.style.transition = "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
            card.style.opacity = "1";
            card.style.transform = "perspective(800px) rotateY(0deg) scale(1)";
          }, 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 5. ROTATING TABS FOR SKILLS TOOLKIT
  const skillTabs = document.querySelectorAll("#skillTabs .rot-tab");
  const skillCards = document.querySelectorAll("#skillsContainer .skill-card");

  skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      skillTabs.forEach((t) => {
        t.classList.remove("active");
        t.style.transform = "perspective(600px) rotateY(0deg)";
      });

      tab.classList.add("active");
      tab.style.transform = "perspective(600px) rotateY(12deg) translateZ(10px) scale(1.04)";
      setTimeout(() => {
        tab.style.transform = "perspective(600px) rotateY(0deg) translateZ(10px) scale(1.02)";
      }, 300);

      const group = tab.getAttribute("data-skilltab");
      skillCards.forEach((card) => {
        const cGroup = card.getAttribute("data-skillgroup");
        if (group === "all" || cGroup === group) {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.transform = "perspective(800px) rotateX(15deg) translateY(15px)";
          setTimeout(() => {
            card.style.transition = "all 0.35s ease";
            card.style.opacity = "1";
            card.style.transform = "perspective(800px) rotateX(0deg) translateY(0)";
          }, 40);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 6. 3D INTERACTIVE TILT EFFECT ON CARDS
  const tiltCards = document.querySelectorAll("[data-tilt]");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  // 7. DYNAMIC CERTIFICATE LIGHTBOX MODAL
  const certModal = document.getElementById("certModal");
  const modalImg = document.getElementById("modalImg");
  const modalIssuerTag = document.getElementById("modalIssuerTag");
  const modalIdTag = document.getElementById("modalIdTag");
  const modalFooterText = document.getElementById("modalFooterText");
  const modalDownloadBtn = document.getElementById("modalDownloadBtn");
  const closeCertModal = document.getElementById("closeCertModal");
  const closeCertModalBtn = document.getElementById("closeCertModalBtn");

  const openModalWithData = (trigger) => {
    if (!certModal) return;
    const img = trigger.getAttribute("data-img") || "assets/certificates/learntube-cybersecurity.jpg";
    const title = trigger.getAttribute("data-title") || "Certificate";
    const issuer = trigger.getAttribute("data-issuer") || "Verified Issuer";
    const id = trigger.getAttribute("data-id") || "ID: Verified";
    const date = trigger.getAttribute("data-date") || "2026";
    const recipient = trigger.getAttribute("data-recipient") || "Nitya Goswami";

    if (modalImg) modalImg.src = img;
    if (modalIssuerTag) modalIssuerTag.textContent = `${issuer.toUpperCase()} CERTIFICATE`;
    if (modalIdTag) modalIdTag.textContent = id;
    if (modalFooterText) {
      modalFooterText.innerHTML = `<strong>${recipient}</strong> — ${title} • ${issuer} • ${date}`;
    }
    if (modalDownloadBtn) {
      modalDownloadBtn.href = img;
      modalDownloadBtn.download = `${title.replace(/\s+/g, "_")}_Certificate.jpg`;
    }

    certModal.classList.add("open");
    certModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!certModal) return;
    certModal.classList.remove("open");
    certModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  // Wire up all triggers
  const modalTriggers = document.querySelectorAll(".cert-modal-trigger");
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModalWithData(trigger));
  });

  if (closeCertModal) closeCertModal.addEventListener("click", closeModal);
  if (closeCertModalBtn) closeCertModalBtn.addEventListener("click", closeModal);

  if (certModal) {
    certModal.addEventListener("click", (e) => {
      if (e.target === certModal) closeModal();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && certModal.classList.contains("open")) {
        closeModal();
      }
    });
  }

  // 8. TOAST NOTIFICATION & COPY-TO-CLIPBOARD FUNCTIONALITY
  const toastContainer = document.getElementById("toastContainer");

  const showToast = (message) => {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>⚡ ${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.getAttribute("data-copy");
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          const originalText = btn.textContent;
          btn.textContent = "Copied! ✓";
          btn.style.borderColor = "var(--yellow-neon)";
          btn.style.color = "var(--yellow-neon)";
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = "";
            btn.style.color = "";
          }, 2000);
        }).catch(() => {
          showToast("Failed to copy. Please manually select.");
        });
      }
    });
  });

  // 9. QUICK CONTACT FORM (WHATSAPP & EMAIL DIRECT TRIGGER)
  const sendWhatsAppBtn = document.getElementById("sendWhatsAppBtn");
  const sendEmailBtn = document.getElementById("sendEmailBtn");
  const senderName = document.getElementById("senderName");
  const senderSubject = document.getElementById("senderSubject");
  const senderMessage = document.getElementById("senderMessage");

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener("click", () => {
      const name = senderName?.value.trim() || "Visitor";
      const subject = senderSubject?.value.trim() || "Portfolio Inquiry";
      const message = senderMessage?.value.trim() || "Hi Nitya, I would love to connect with you!";

      const encodedText = encodeURIComponent(
        `Hi Nitya,\n\nName: ${name}\nSubject: ${subject}\n\nMessage:\n${message}\n\n(Sent via nitya-portfolio)`
      );
      const waUrl = `https://wa.me/918320985204?text=${encodedText}`;
      window.open(waUrl, "_blank");
      showToast("Redirecting to WhatsApp with your message! 🚀");
    });
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", () => {
      const name = senderName?.value.trim() || "Visitor";
      const subject = senderSubject?.value.trim() || "Portfolio Opportunity / Inquiry";
      const message = senderMessage?.value.trim() || "Hi Nitya, I would love to connect with you!";

      const mailtoUrl = `mailto:nityagoswami2707@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - ${name}`
      )}&body=${encodeURIComponent(`Hi Nitya,\n\n${message}\n\nBest regards,\n${name}`)}`;
      window.location.href = mailtoUrl;
      showToast("Opening your email client! ✉️");
    });
  }

  // 10. BACK TO TOP SMOOTH SCROLLER
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 11. Subtle Parallax for Background Mesh Blobs on Mouse Movement
  const blobs = document.querySelectorAll(".mesh-blob");
  window.addEventListener("mousemove", (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
    blobs.forEach((blob, i) => {
      const factor = (i + 1) * 0.5;
      blob.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });
});

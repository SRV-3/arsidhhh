/* ===========================
   VANILLA JAVASCRIPT
   =========================== */

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", function () {
  setupIntersectionObserver();
  setupMobileNavigation();
  loadPortfolio();
  setupSmoothScroll();
  setupVideoControls();
  setupCustomCursor();
});

// ========== SCROLL REVEAL WITH INTERSECTION OBSERVER ==========
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-on-scroll");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    observer.observe(card);
  });

  // Observe why-us cards
  document.querySelectorAll(".why-us-card").forEach((card) => {
    observer.observe(card);
  });

  // Observe portfolio items
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    observer.observe(item);
  });

  // Observe section headers
  document.querySelectorAll(".section-header").forEach((header) => {
    observer.observe(header);
  });
}

// ========== MOBILE NAVIGATION TOGGLE ==========
function setupMobileNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close menu when a link is clicked
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
    });
  });
}

// ========== LOAD PORTFOLIO ITEMS ==========
function loadPortfolio() {
  const portfolioGrid = document.getElementById("portfolioGrid");
  if (!portfolioGrid) return;

  // Sample portfolio data - replace with actual assets
  const portfolioItems = [
    {
      type: "video",
      src: "./assets/reels/short1.mp4",
      alt: "Portfolio item 1",
    },
    {
      type: "video",
      src: "./assets/reels/short2.mp4",
      alt: "Portfolio item 2",
    },
    {
      type: "video",
      src: "./assets/reels/short3.mp4",
      alt: "Portfolio video 1",
    },
    {
      type: "video",
      src: "./assets/reels/short4.mp4",
      alt: "Portfolio video 1",
    },
    {
      type: "video",
      src: "./assets/reels/short5.mp4",
      alt: "Portfolio video 1",
    },
    {
      type: "video",
      src: "./assets/reels/short6.mp4",
      alt: "Portfolio video 1",
    },
    {
      type: "video",
      src: "./assets/reels/short7.mp4",
      alt: "Portfolio video 1",
    },
    {
      type: "video",
      src: "./assets/reels/short8.mp4",
      alt: "Portfolio video 1",
    },
  ];

  portfolioItems.forEach((item, index) => {
    const portfolioItem = document.createElement("div");
    portfolioItem.className = "portfolio-item glass-effect";

    if (item.type === "image") {
      portfolioItem.innerHTML = `
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
            `;
    } else if (item.type === "video") {
      portfolioItem.innerHTML = `
                <div class="video-container">
                  <video muted loop playsinline class="portfolio-video" preload="metadata">
                    <source src="${item.src}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                  <button class="video-mute-btn" title="Unmute">
                    <i class="ri-volume-mute-line"></i>
                  </button>
                </div>
            `;
    }

    portfolioGrid.appendChild(portfolioItem);
  });
}

// ========== SMOOTH SCROLL BEHAVIOR ==========
function setupSmoothScroll() {
  // Smooth scroll is already in CSS, but we can enhance it
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// ========== VIDEO MUTE/UNMUTE FUNCTIONALITY ==========
function setupVideoControls() {
  document.addEventListener("click", function (e) {
    if (e.target.closest(".video-mute-btn")) {
      const btn = e.target.closest(".video-mute-btn");
      const container = btn.closest(".video-container");
      const video = container.querySelector(".portfolio-video");

      if (video) {
        video.muted = !video.muted;
        btn.innerHTML = video.muted
          ? '<i class="ri-volume-mute-line"></i>'
          : '<i class="ri-volume-up-line"></i>';
        btn.title = video.muted ? "Unmute" : "Mute";
      }
    }
  });

  // Add hover effects for videos
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const video = item.querySelector(".portfolio-video");
    if (video) {
      item.addEventListener("mouseenter", function () {
        video.muted = false;
        video.play().catch((err) => {
          // Autoplay may be blocked by browser
          console.log("Autoplay prevented:", err);
        });
      });

      item.addEventListener("mouseleave", function () {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
      });
    }
  });
}

// ========== CUSTOM CURSOR ==========
function setupCustomCursor() {
  const cursorDot = document.createElement("div");
  cursorDot.className = "custom-cursor";

  document.body.appendChild(cursorDot);

  document.addEventListener("mousemove", function (e) {
    const style = document.body.style;
    style.setProperty("--cursor-x", e.clientX + "px");
    style.setProperty("--cursor-y", e.clientY + "px");
  });
}

// ========== PARALLAX EFFECT ON SCROLL ==========
window.addEventListener("scroll", function () {
  const blobs = document.querySelectorAll(".blob");
  const scrollPosition = window.scrollY;

  blobs.forEach((blob, index) => {
    const speed = 0.5 + index * 0.1;
    blob.style.transform = `translateY(${scrollPosition * speed}px)`;
  });

  // Add header shadow on scroll
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 10px 30px rgba(37, 99, 235, 0.3)";
  } else {
    header.style.boxShadow = "none";
  }
});

// ========== BUTTON RIPPLE EFFECT ==========
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.className = "ripple";

    // Remove any existing ripple
    const existingRipple = this.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ========== FORM VALIDATION (If needed) ==========
// You can extend this for any forms you add

// ========== PERFORMANCE OPTIMIZATION ==========
// Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener("keydown", function (e) {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
      navMenu.classList.remove("active");
    }
  }

  // Navigate sections with arrow keys
  if (e.key === "Home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// ========== ADAPTIVE ANIMATION BASED ON DEVICE ==========
function detectDevice() {
  const userAgent = navigator.userAgent;
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent,
    );

  if (isMobile) {
    // Reduce animations on mobile for better performance
    document.documentElement.style.setProperty("--transition-speed", "0.15s");
  }
}

detectDevice();

// ========== ANALYTICS EVENT TRACKING (Optional) ==========
function trackEvent(eventName, eventData = {}) {
  // You can integrate with your analytics service here
  console.log(`Event: ${eventName}`, eventData);
}

// Track button clicks
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    trackEvent("button_click", {
      buttonText: this.textContent,
      buttonClass: this.className,
    });
  });
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener("scroll", function () {
  const scrollPercentage =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  if (scrollPercentage > maxScroll) {
    maxScroll = scrollPercentage;
    if (maxScroll === 100) {
      trackEvent("page_fully_scrolled");
    }
  }
});

// ========== PRELOAD IMAGES FOR BETTER PERFORMANCE ==========
function preloadImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = img.src;
    document.head.appendChild(link);
  });
}

// Call after page load
window.addEventListener("load", preloadImages);

// ========== CURSOR STYLE ON HOVER ELEMENTS ==========
document.addEventListener("mouseover", function (e) {
  if (
    e.target.matches("a, button, .portfolio-item, .service-card, .why-us-card")
  ) {
    document.body.style.cursor = "pointer";
  }
});

document.addEventListener("mouseout", function (e) {
  if (
    e.target.matches("a, button, .portfolio-item, .service-card, .why-us-card")
  ) {
    document.body.style.cursor = "auto";
  }
});

// ========== PRINT STYLES SUPPORT ==========
window.addEventListener("beforeprint", function () {
  document.body.style.background = "#fff";
  document.querySelectorAll(".glass-effect").forEach((el) => {
    el.style.background = "#f9fafb";
  });
});

window.addEventListener("afterprint", function () {
  location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".onepage-wrapper");
  const sections = document.querySelectorAll(".section");
  const paginationLinks = document.querySelectorAll(".onepage-pagination a");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  // Debug: Log section count
  console.log(`Found ${sections.length} sections`);

  if (!wrapper || sections.length === 0) {
    console.error("Onepage wrapper or sections not found");
    return;
  }

  let current = 0;
  let isScrolling = false;
  let startY = 0;
  let lastWheelTime = 0;
  const SCROLL_DELAY = 400;

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  function scrollToSection(index) {
    current = Math.max(0, Math.min(index, sections.length - 1));

    if (isMobile()) {
      sections[current].scrollIntoView({ behavior: "smooth" });
    } else {
      wrapper.style.transform = `translateY(-${current * 100}vh)`;
      wrapper.style.height = `${sections.length * 100}vh`;
    }

    paginationLinks.forEach((link, i) => {
      link.classList.toggle("active", i === current);
    });
  }

  function throttleScroll(callback) {
    if (isScrolling) return;
    isScrolling = true;
    callback();
    setTimeout(() => (isScrolling = false), SCROLL_DELAY);
  }

  const moveUp = () => scrollToSection(current - 1);
  const moveDown = () => scrollToSection(current + 1);

  // Pagination
  paginationLinks.forEach((link, i) => {
    link.addEventListener("click", e => {
      e.preventDefault();
      scrollToSection(i);
    });
  });

  // Wheel (desktop)
  if (!isMobile()) {
    window.addEventListener("wheel", (e) => {
      e.preventDefault();
      const now = Date.now();
      const delta = e.deltaY;

      if (Math.abs(delta) < 15) return;
      if (now - lastWheelTime < SCROLL_DELAY) return;
      lastWheelTime = now;

      throttleScroll(() => {
        delta > 0 ? moveDown() : moveUp();
      });
    }, { passive: false });
  }

  // Keyboard (desktop)
  if (!isMobile()) {
    window.addEventListener("keydown", (e) => {
      if (["ArrowDown", "PageDown", "Space"].includes(e.key)) {
        e.preventDefault();
        throttleScroll(moveDown);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        throttleScroll(moveUp);
      }
    });
  }

  // Touch swipe
  wrapper.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  wrapper.addEventListener("touchend", (e) => {
    if (!isMobile()) return;
    const endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;
    if (Math.abs(deltaY) > 50) { // Reduced threshold
      throttleScroll(() => {
        deltaY > 0 ? moveDown() : moveUp();
      });
    }
  });

  // Mobile menu
  menuToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuToggle.classList.toggle("open");
  });

  // Auto-close on link click
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.classList.remove("open");
    });
  });

  // Initialize
  scrollToSection(current);

  // Re-align on resize
  window.addEventListener("resize", () => {
    scrollToSection(current);
  });
});

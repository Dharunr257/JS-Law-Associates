document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("typewriter");
    const text = "JS LAW ASSOCIATES";
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 1500;

    function typeLoop() {
      element.textContent = text.substring(0, index);

      if (!isDeleting) {
        if (index < text.length) {
          index++;
          setTimeout(typeLoop, typingSpeed);
        } else {
          isDeleting = true;
          setTimeout(typeLoop, pauseTime);
        }
      } else {
        if (index > 0) {
          index--;
          setTimeout(typeLoop, deletingSpeed);
        } else {
          isDeleting = false;
          setTimeout(typeLoop, typingSpeed);
        }
      }
    }

    typeLoop();
  });
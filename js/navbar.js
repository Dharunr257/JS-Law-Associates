// navbar.js
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function() {
            menuToggle.classList.toggle("open");
            navLinks.classList.toggle("show");
        });

        // Optional: Auto-close menu on link click
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
                menuToggle.classList.remove("open");
            });
        });
    }
});

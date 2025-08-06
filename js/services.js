document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".read-more-trigger");
  const modal = document.getElementById("service-modal");
  const modalDetails = document.getElementById("modal-details");
  const closeModalBtn = document.getElementById("close-modal");

  serviceCards.forEach(button => {
    button.addEventListener("click", function () {
      const serviceKey = this.dataset.service;
      const data = serviceData[serviceKey];
      console.log(data.image)
      if (!data) return;

      // Dynamically inject modal content
      modalDetails.innerHTML = `
  <div class="modal-flex-container">
    <div class="modal-text">
      <h2>${data.title}</h2>

      <div class="modal-buttons">
        <a href="https://wa.me/919123456789" target="_blank" class="whatsapp-btn">
          <i class="fab fa-whatsapp"></i> WhatsApp
        </a>
        <a href="contact.html#form" class="consult-btn">BOOK A FREE CONSULTATION</a>
      </div>

      <p><strong>Overview:</strong> ${data.overview}</p>

      <h4>Services by JS Law Associates:</h4>
      <ul>
        ${data.services.map(item => `<li>${item}</li>`).join('')}
      </ul>

      ${data.suitedFor ? `
        <h4>${data.title.includes("RERA") ? "Common Issues Covered:" : "Best Suited For:"}</h4>
        <ul>
          ${data.suitedFor.map(item => `<li>${item}</li>`).join('')}
        </ul>
      ` : ''}
    </div>

    <div class="modal-image">
      <img src="${data.image}" alt="${data.title}">
    </div>
  </div>
`;

      modal.classList.remove("hidden");
    });
  });

  // Close modal on close icon click
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Close modal on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });
});



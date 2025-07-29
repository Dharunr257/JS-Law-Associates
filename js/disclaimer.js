document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("disclaimer-modal");
    const agreeBtn = document.getElementById("agree-button");

    // Show disclaimer only if not already accepted
    if (!localStorage.getItem("disclaimerAccepted")) {
      modal.style.display = "flex";
    }

    // Handle Agree button click
    agreeBtn.addEventListener("click", function () {
      localStorage.setItem("disclaimerAccepted", "true");
      modal.style.display = "none";
    });
  });
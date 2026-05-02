const founderLoginForm = document.getElementById("founderLoginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const formMessage = document.getElementById("formMessage");

togglePasswordBtn.addEventListener("click", () => {
    const isPasswordHidden = passwordInput.type === "password";

    passwordInput.type = isPasswordHidden ? "text" : "password";
    togglePasswordBtn.textContent = isPasswordHidden ? "Hide" : "Show";
});

founderLoginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        formMessage.textContent = "Please enter both email address and password.";
        return;
    }

    formMessage.textContent = "Founder login submitted successfully.";

    setTimeout(() => { window.location.href = "founders-dashboard.html"; }, 800);

    /*
      Replace this placeholder logic with your real authentication request.
  
      Example:
      fetch("/api/auth/founder-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
    */
});
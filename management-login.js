const managementLoginForm = document.getElementById("managementLoginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const accessCodeInput = document.getElementById("accessCode");
const togglePasswordBtn = document.getElementById("togglePassword");
const formMessage = document.getElementById("formMessage");

togglePasswordBtn.addEventListener("click", () => {
  const isPasswordHidden = passwordInput.type === "password";

  passwordInput.type = isPasswordHidden ? "text" : "password";
  togglePasswordBtn.textContent = isPasswordHidden ? "Hide" : "Show";
});

managementLoginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const accessCode = accessCodeInput.value.trim();

  if (!email || !password || !accessCode) {
    formMessage.textContent = "Please enter your email address, password and access code.";
    return;
  }

  formMessage.textContent = "Management login submitted successfully.";

  setTimeout(() => { window.location.href = "management-dashboard.html"; }, 800);

  /*
    Replace this placeholder logic with your real authentication request.

    Example:
    fetch("/api/auth/management-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, accessCode })
    });
  */
});
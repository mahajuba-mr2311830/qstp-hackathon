const managementLoginForm = document.getElementById("managementLoginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
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

  if (!email || !password) {
    formMessage.textContent = "Please enter your email address and password.";
    return;
  }

  formMessage.textContent = "Management login submitted successfully.";

  setTimeout(() => {
    window.location.href = "management-dashboard.html";
  }, 800);
});
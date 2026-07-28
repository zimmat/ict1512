document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  console.log({ form });

  form.setAttribute("novalidate", true);

  form.addEventListener("submit", function (e) {
    let valid = true;
    // ACCOUNT CREDENTIALS
    valid = validateRequired("username", "Enter username") && valid;
    valid =
      validatePasswords("accountPassword", "confirmAccountPassword") && valid;

    if (!valid) {
      e.preventDefault();
      form.reportValidity();
    }
  });

  // =====================
  // REQUIRED FIELD
  // =====================

  function validateRequired(id, message) {
    const field = document.getElementById(id);

    if (!field.value.trim()) {
      field.setCustomValidity(message);
      return false;
    }

    field.setCustomValidity("");
    return true;
  }
  // =====================
  // PASSWORD
  // =====================

  function validatePasswords(passwordId, confirmId) {
    const password = document.getElementById(passwordId);
    const confirmPassword = document.getElementById(confirmId);

    // Validate the password
    if (!password.value.trim()) {
      password.setCustomValidity("Enter password");
      return false;
    }

    // Minimum length
    if (password.value.length < 8) {
      password.setCustomValidity("Your password must be at least 8 characters long");
      return false;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password.value)) {
      password.setCustomValidity(
        "Your password must include an uppercase letter",
      );
      return false;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password.value)) {
      password.setCustomValidity(
        "Your password must include at least one lowercase letter",
      );
      return false;
    }

    // At least one digit
    if (!/\d/.test(password.value)) {
      password.setCustomValidity("Your password must include at least one digit");
      return false;
    }

    // At least one symbol
    if (!/[!@#$]/.test(password.value)) {
      password.setCustomValidity(
        "Your password must include at least one of the following symbols: !, @, #, or $",
      );
      return false;
    }
    password.setCustomValidity("");

    if (!confirmPassword.value.trim()) {
      confirmPassword.setCustomValidity("Confirm your password");
      return false;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match");
      return false;
    }

    password.setCustomValidity("");
    confirmPassword.setCustomValidity("");

    return true;
  }
});

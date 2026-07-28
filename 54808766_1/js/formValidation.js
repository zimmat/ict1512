document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  console.log({form});

  form.setAttribute("novalidate", true);

  form.addEventListener("submit", function (e) {
    let valid = true;
    // ACCOUNT CREDENTIALS
    valid = validateRequired("username", "Enter username") && valid;
    valid = validatePasswords("accountPassword", "confirmAccountPassword") && valid;

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

    // At least 8 characters, one letter, one number,
    // and one of: ! @ # $
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$])[A-Za-z\d!@#$]{8,}$/;

    if (!password.value.trim()) {
        password.setCustomValidity("Enter password");
        return false;
    }

    if (!passwordRegex.test(password.value)) {
        password.setCustomValidity(
            "Password must be at least 8 characters and contain at least one letter, one number, and one of these symbols: ! @ # or $"
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

    confirmPassword.setCustomValidity("");

    return true;
}

});
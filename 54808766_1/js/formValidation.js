document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.setAttribute("novalidate", true);

  form.addEventListener("submit", function (e) {
    let valid = true;

    // PERSONAL INFORMATION
    valid = validateRequired("preferredName", "Enter preferred name") && valid;
    valid = validateRequired("fullNames", "Enter full names as shown on ID") && valid;
    valid = validateRequired("surname", "Enter surname") && valid;
    valid = validateID() && valid;
    valid = validatePhone() && valid;
    valid = validateEmail() && valid;

    // SHIPPING ADDRESS
    valid = validateRequired("shippingStreet", "Enter shipping street") && valid;
    valid = validateRequired("shippingSuburb", "Enter shipping suburb") && valid;
    valid = validateRequired("shippingCity", "Enter shipping city") && valid;
    valid = validateRequired("shippingProvince", "Enter shipping province") && valid;
    valid = validatePostal("shippingPostal") && valid;

    // BILLING ADDRESS
    valid = validateRequired("billingStreet", "Enter billing street") && valid;
    valid = validateRequired("billingSuburb", "Enter billing suburb") && valid;
    valid = validateRequired("billingCity", "Enter billing city") && valid;
    valid = validateRequired("billingProvince", "Enter billing province") && valid;
    valid = validatePostal("billingPostal") && valid;

    // REFERRAL
    valid = validateSelect(
      "vendorReferral",
      "Select where the client heard about the street vendor"
    ) && valid;

    // CREDIT CARD
    valid = validateRequired("cardName", "Enter name on credit card") && valid;
    valid = validateSelect("cardType", "Select credit card type") && valid;
    valid = validateCardNumber() && valid;
    valid = validateExpiry() && valid;
    valid = validateCVC() && valid;

    // PASSWORD VERIFICATION SECTION
    valid = validatePasswords("password1", "confirmPassword1") && valid;

    // ACCOUNT CREDENTIALS
    valid = validateRequired("username", "Enter username") && valid;
    valid = validatePasswords(
      "accountPassword",
      "confirmAccountPassword"
    ) && valid;

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
  // SELECT VALIDATION
  // =====================

  function validateSelect(id, message) {
    const field = document.getElementById(id);

    if (field.value === "") {
      field.setCustomValidity(message);
      return false;
    }

    field.setCustomValidity("");
    return true;
  }

  // =====================
  // EMAIL
  // =====================

  function validateEmail() {
    const email = document.getElementById("email");

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim()) {
      email.setCustomValidity("Enter email address");
      return false;
    }

    if (!emailRegex.test(email.value)) {
      email.setCustomValidity("Enter a valid email address");
      return false;
    }

    email.setCustomValidity("");
    return true;
  }

  // =====================
  // PHONE NUMBER
  // =====================

  function validatePhone() {
    const phone = document.getElementById("cellPhone");

    if (!phone.value.trim()) {
      phone.setCustomValidity("Enter cellphone number");
      return false;
    }

    if (!/^[6-8]\d{8}$/.test(phone.value)) {
      phone.setCustomValidity(
        "Enter a valid 9-digit cellphone number after +27"
      );
      return false;
    }

    phone.setCustomValidity("");
    return true;
  }

  // =====================
  // SOUTH AFRICAN ID
  // =====================

  function validateID() {
    const id = document.getElementById("idNumber");

    if (!id.value.trim()) {
      id.setCustomValidity("Enter ID number");
      return false;
    }

    if (!/^\d{13}$/.test(id.value)) {
      id.setCustomValidity(
        "South African ID number must contain exactly 13 digits"
      );
      return false;
    }

    if (!luhnCheck(id.value)) {
      id.setCustomValidity("Invalid South African ID number");
      return false;
    }

    id.setCustomValidity("");
    return true;
  }

  // =====================
  // POSTAL CODE
  // =====================

  function validatePostal(id) {
    const postal = document.getElementById(id);

    if (!postal.value.trim()) {
      postal.setCustomValidity("Enter postal code");
      return false;
    }

    if (!/^\d{4}$/.test(postal.value)) {
      postal.setCustomValidity(
        "Postal code must contain exactly 4 digits"
      );
      return false;
    }

    postal.setCustomValidity("");
    return true;
  }

  // =====================
  // CREDIT CARD
  // =====================

  function validateCardNumber() {
    const card = document.getElementById("cardNumber");

    if (!card.value.trim()) {
      card.setCustomValidity("Enter credit card number");
      return false;
    }

    if (!/^\d{13,16}$/.test(card.value)) {
      card.setCustomValidity(
        "Credit card number must contain 13 to 16 digits"
      );
      return false;
    }

    if (!luhnCheck(card.value)) {
      card.setCustomValidity("Invalid credit card number");
      return false;
    }

    card.setCustomValidity("");
    return true;
  }

  // =====================
  // EXPIRY DATE
  // =====================

  function validateExpiry() {
    const month = document.getElementById("expiryMonth");
    const year = document.getElementById("expiryYear");

    if (month.value === "") {
      month.setCustomValidity("Select expiration month");
      return false;
    }

    if (year.value === "") {
      year.setCustomValidity("Select expiration year");
      return false;
    }

    const currentDate = new Date();
    const expiryDate = new Date(year.value, month.value - 1);

    if (
      expiryDate <
      new Date(currentDate.getFullYear(), currentDate.getMonth())
    ) {
      month.setCustomValidity("Credit card has expired");
      return false;
    }

    month.setCustomValidity("");
    year.setCustomValidity("");

    return true;
  }

  // =====================
  // CVC
  // =====================

  function validateCVC() {
    const cvc = document.getElementById("cvc");

    if (!cvc.value.trim()) {
      cvc.setCustomValidity("Enter CVC number");
      return false;
    }

    if (!/^\d{3,4}$/.test(cvc.value)) {
      cvc.setCustomValidity(
        "CVC number must contain 3 or 4 digits"
      );
      return false;
    }

    cvc.setCustomValidity("");
    return true;
  }

  // =====================
  // PASSWORD
  // =====================

  function validatePasswords(passwordId, confirmId) {
    const password = document.getElementById(passwordId);
    const confirmPassword = document.getElementById(confirmId);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password.value.trim()) {
      password.setCustomValidity("Enter password");
      return false;
    }

    if (!passwordRegex.test(password.value)) {
      password.setCustomValidity(
        "Your password must be at least 8 characters with at least one letter and one number"
      );
      return false;
    }

    if (confirmPassword.value.trim() === "") {
      confirmPassword.setCustomValidity(
        "Confirm your password"
      );
      return false;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        "Passwords do not match"
      );
      return false;
    }

    password.setCustomValidity("");
    confirmPassword.setCustomValidity("");

    return true;
  }

  // =====================
  // LUHN ALGORITHM
  // =====================

  function luhnCheck(number) {
    let sum = 0;
    let doubleDigit = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));

      if (doubleDigit) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      doubleDigit = !doubleDigit;
    }

    return sum % 10 === 0;
  }
});
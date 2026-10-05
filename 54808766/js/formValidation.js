"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ============================================================
    // GET FORM ELEMENTS
    // ============================================================

    const form = document.getElementById("registrationForm");

    // ============================================================
    // SHIPPING TO BILLING ADDRESS
    // Copy the shipping address into the billing address when
    // the checkbox is selected.
    // ============================================================

    const copyAddress = document.getElementById("copyPostalAddress");

    const shippingStreet = document.getElementById("shippingStreet");
    const shippingSuburb = document.getElementById("shippingSuburb");
    const shippingCity = document.getElementById("shippingCity");
    const shippingProvince = document.getElementById("shippingProvince");
    const shippingPostal = document.getElementById("shippingPostal");

    const billingStreet = document.getElementById("billingStreet");
    const billingSuburb = document.getElementById("billingSuburb");
    const billingCity = document.getElementById("billingCity");
    const billingProvince = document.getElementById("billingProvince");
    const billingPostal = document.getElementById("billingPostal");


    // Copy shipping address to billing address.
    function copyShippingToBilling() {

        if (copyAddress.checked) {

            billingStreet.value = shippingStreet.value;
            billingSuburb.value = shippingSuburb.value;
            billingCity.value = shippingCity.value;
            billingProvince.value = shippingProvince.value;
            billingPostal.value = shippingPostal.value;
        }
    }


    // Copy the address when the checkbox is selected.
    copyAddress.addEventListener("change", function () {

        if (copyAddress.checked) {
            copyShippingToBilling();
        }
    });


    // Keep the billing address updated when the shipping address
    // changes while the checkbox is selected.
    shippingStreet.addEventListener("input", copyShippingToBilling);
    shippingSuburb.addEventListener("input", copyShippingToBilling);
    shippingCity.addEventListener("input", copyShippingToBilling);
    shippingPostal.addEventListener("input", copyShippingToBilling);

    shippingProvince.addEventListener("change", copyShippingToBilling);


    // ============================================================
    // VALIDATION REGULAR EXPRESSIONS
    // ============================================================

    // South African ID number: exactly 13 digits.
    const idRegex = /^\d{13}$/;

    // South African cellphone number without the +27 prefix.
    const phoneRegex = /^[6-8]\d{8}$/;

    // Basic email validation.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Credit card number: 13 to 19 digits after spaces are removed.
    const cardRegex = /^\d{13,19}$/;

    // CVC must contain 3 or 4 digits.
    const cvcRegex = /^\d{3,4}$/;

    // Password must contain:
    // - at least 8 characters
    // - one uppercase letter
    // - one lowercase letter
    // - one number
    // - one special character
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;


    // ============================================================
    // LUHN ALGORITHM
    // Used to validate the ID number and credit card number.
    // ============================================================

    function luhnCheck(number) {

        let sum = 0;
        let shouldDouble = false;

        // Read the number from right to left.
        for (let i = number.length - 1; i >= 0; i--) {

            let digit = Number(number[i]);

            // Double every second digit.
            if (shouldDouble) {

                digit = digit * 2;

                // If the result is greater than 9,
                // subtract 9.
                if (digit > 9) {
                    digit = digit - 9;
                }
            }

            sum = sum + digit;

            shouldDouble = !shouldDouble;
        }

        // A valid Luhn number has a remainder of zero.
        return sum % 10 === 0;
    }


    // ============================================================
    // CUSTOM VALIDATION FUNCTIONS
    // ============================================================

    function validateRequired(id, message) {

        const field = document.getElementById(id);

        // Clear an old validation message.
        field.setCustomValidity("");

        if (!field.value.trim()) {

            field.setCustomValidity(message);

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE ID NUMBER
    // ============================================================

    function validateID() {

        const field = document.getElementById("idNumber");
        const value = field.value.trim();

        field.setCustomValidity("");

        if (!value) {

            field.setCustomValidity(
                "Please enter your 13-digit ID number."
            );

            return false;
        }

        if (!idRegex.test(value)) {

            field.setCustomValidity(
                "ID number must contain exactly 13 digits."
            );

            return false;
        }

        if (!luhnCheck(value)) {

            field.setCustomValidity(
                "Please enter a valid ID number."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE CELL PHONE NUMBER
    // ============================================================

    function validatePhone() {

        const field = document.getElementById("cellphoneNumber");
        const value = field.value.trim();

        field.setCustomValidity("");

        if (!value) {

            field.setCustomValidity(
                "Please enter your cellphone number."
            );

            return false;
        }

        if (!phoneRegex.test(value)) {

            field.setCustomValidity(
                "Enter a valid South African cellphone number, for example 821234567."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE EMAIL
    // ============================================================

    function validateEmail() {

        const field = document.getElementById("email");
        const value = field.value.trim();

        field.setCustomValidity("");

        if (!value) {

            field.setCustomValidity(
                "Please enter your email address."
            );

            return false;
        }

        if (!emailRegex.test(value)) {

            field.setCustomValidity(
                "Please enter a valid email address."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE CREDIT CARD NUMBER
    // ============================================================

    function validateCardNumber() {

        const field = document.getElementById("cardNumber");

        // Remove spaces from the card number.
        const value = field.value.replace(/\s/g, "");

        field.setCustomValidity("");

        if (!value) {

            field.setCustomValidity(
                "Please enter your credit card number."
            );

            return false;
        }

        if (!cardRegex.test(value)) {

            field.setCustomValidity(
                "Credit card number must contain between 13 and 19 digits."
            );

            return false;
        }

        if (!luhnCheck(value)) {

            field.setCustomValidity(
                "Please enter a valid credit card number."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE CVC
    // ============================================================

    function validateCVC() {

        const field = document.getElementById("cvc");
        const value = field.value.trim();

        field.setCustomValidity("");

        if (!value) {

            field.setCustomValidity(
                "Please enter your CVC number."
            );

            return false;
        }

        if (!cvcRegex.test(value)) {

            field.setCustomValidity(
                "CVC number must contain 3 or 4 digits."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE PASSWORD
    // ============================================================

    function validatePasswords() {

        const password =
            document.getElementById("accountPassword");

        const confirmPassword =
            document.getElementById("confirmAccountPassword");

        password.setCustomValidity("");
        confirmPassword.setCustomValidity("");


        if (!password.value) {

            password.setCustomValidity(
                "Please enter a password."
            );

            return false;
        }


        // Check password against the regular expression.
        if (!passwordRegex.test(password.value)) {

            password.setCustomValidity(
                "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number and special character."
            );

            return false;
        }


        if (!confirmPassword.value) {

            confirmPassword.setCustomValidity(
                "Please confirm your password."
            );

            return false;
        }


        if (password.value !== confirmPassword.value) {

            confirmPassword.setCustomValidity(
                "Passwords do not match."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // VALIDATE POSTAL CODES
    // ============================================================

    function validatePostalCode(id, message) {

        const field = document.getElementById(id);
        const value = field.value.trim();

        field.setCustomValidity("");

        if (!value) {

            field.setCustomValidity(message);

            return false;
        }

        if (!/^\d{4}$/.test(value)) {

            field.setCustomValidity(
                "Postal code must contain exactly 4 digits."
            );

            return false;
        }

        return true;
    }


    // ============================================================
    // FORM SUBMISSION
    // ============================================================

    form.addEventListener("submit", function (event) {

        // Stop the form from submitting normally.
        event.preventDefault();


        let valid = true;


        // --------------------------------------------------------
        // PERSONAL INFORMATION
        // --------------------------------------------------------

        valid =
            validateRequired(
                "preferredName",
                "Please enter your preferred name."
            ) && valid;

        valid =
            validateRequired(
                "fullNames",
                "Please enter your full names as they appear on your ID."
            ) && valid;

        valid =
            validateRequired(
                "surname",
                "Please enter your surname."
            ) && valid;

        valid = validateID() && valid;

        valid = validatePhone() && valid;

        valid = validateEmail() && valid;


        // --------------------------------------------------------
        // SHIPPING ADDRESS
        // --------------------------------------------------------

        valid =
            validateRequired(
                "shippingStreet",
                "Please enter your shipping street name."
            ) && valid;

        valid =
            validateRequired(
                "shippingSuburb",
                "Please enter your shipping suburb."
            ) && valid;

        valid =
            validateRequired(
                "shippingCity",
                "Please enter your shipping city or town."
            ) && valid;

        valid =
            validateRequired(
                "shippingProvince",
                "Please select your shipping province."
            ) && valid;

        valid =
            validatePostalCode(
                "shippingPostal",
                "Please enter your shipping postal code."
            ) && valid;


        // --------------------------------------------------------
        // BILLING ADDRESS
        // --------------------------------------------------------

        valid =
            validateRequired(
                "billingStreet",
                "Please enter your billing street name."
            ) && valid;

        valid =
            validateRequired(
                "billingSuburb",
                "Please enter your billing suburb."
            ) && valid;

        valid =
            validateRequired(
                "billingCity",
                "Please enter your billing city or town."
            ) && valid;

        valid =
            validateRequired(
                "billingProvince",
                "Please select your billing province."
            ) && valid;

        valid =
            validatePostalCode(
                "billingPostal",
                "Please enter your billing postal code."
            ) && valid;


        // --------------------------------------------------------
        // STREET VENDOR REFERRAL
        // --------------------------------------------------------

        valid =
            validateRequired(
                "streetVendor",
                "Please select where you heard about the street vendor."
            ) && valid;


        // --------------------------------------------------------
        // CREDIT CARD INFORMATION
        // --------------------------------------------------------

        valid =
            validateRequired(
                "cardName",
                "Please enter the name on the credit card."
            ) && valid;

        valid =
            validateRequired(
                "cardType",
                "Please select your credit card type."
            ) && valid;

        valid = validateCardNumber() && valid;

        valid =
            validateRequired(
                "expirationMonth",
                "Please select the credit card expiration month."
            ) && valid;

        valid =
            validateRequired(
                "expirationYear",
                "Please select the credit card expiration year."
            ) && valid;

        valid = validateCVC() && valid;


        // --------------------------------------------------------
        // PASSWORD
        // --------------------------------------------------------

        valid = validatePasswords() && valid;
        // --------------------------------------------------------
        // USERNAME
        // --------------------------------------------------------

        valid =
            validateRequired(
                "username",
                "Please enter a username."
            ) && valid;


        // --------------------------------------------------------
        // STOP IF ANY VALIDATION FAILED
        // --------------------------------------------------------

        if (!valid) {

            // Display the first appropriate browser validation message.
            form.reportValidity();

            return;
        }


        // ========================================================
        // GET VALUES FOR ORDER CONFIRMATION
        // ========================================================

        const idNumber =
            document.getElementById("idNumber").value.trim();

        const phoneNumber =
            document.getElementById("cellphoneNumber").value.trim();

        const cardNumber =
            document
                .getElementById("cardNumber")
                .value
                .replace(/\s/g, "");


        // ========================================================
        // CREATE CUSTOMER DATA
        // Only the information required by the confirmation page
        // is stored.
        // ========================================================

        const customerData = {

            // Personal information
            preferredName:
                document
                    .getElementById("preferredName")
                    .value
                    .trim(),

            surname:
                document
                    .getElementById("surname")
                    .value
                    .trim(),

            // Display first four ID digits and hide the rest.
            idNumber:
                idNumber.substring(0, 4) + "*********",

            // Add the +27 prefix to the stored cellphone number.
            cellPhone:
                "+27 " + phoneNumber,

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),


            // Shipping address
            shippingStreet:
                document
                    .getElementById("shippingStreet")
                    .value
                    .trim(),

            shippingSuburb:
                document
                    .getElementById("shippingSuburb")
                    .value
                    .trim(),

            shippingCity:
                document
                    .getElementById("shippingCity")
                    .value
                    .trim(),

            shippingProvince:
                document
                    .getElementById("shippingProvince")
                    .value,

            shippingPostal:
                document
                    .getElementById("shippingPostal")
                    .value
                    .trim(),


            // Credit card information
            cardName:
                document
                    .getElementById("cardName")
                    .value
                    .trim(),

            cardType:
                document
                    .getElementById("cardType")
                    .value,

            // Only store the last four digits.
            cardNumber:
                cardNumber.slice(-4)
        };
        // ========================================================
        // SAVE DATA TO LOCAL STORAGE
        // ========================================================
        try {

            localStorage.setItem("orderConfirmation",JSON.stringify(customerData));
            // Continue to the products page.
            window.location.href = "products.html";

        } catch (error) {
            console.error(
                "Error saving registration:",
                error
            );
        }

    });

});

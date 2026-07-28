document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

    // Let your validation script run first
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

        const data = {
            preferredName: document.getElementById("preferredName").value,
            fullNames: document.getElementById("fullNames").value,
            surname: document.getElementById("surname").value,
            idNumber: document.getElementById("idNumber").value,
            cellPhone: document.getElementById("cellPhone").value,
            email: document.getElementById("email").value,

            shippingStreet: document.getElementById("shippingStreet").value,
            shippingSuburb: document.getElementById("shippingSuburb").value,
            shippingCity: document.getElementById("shippingCity").value,
            shippingProvince: document.getElementById("shippingProvince").value,
            shippingPostal: document.getElementById("shippingPostal").value,

            cardName: document.getElementById("cardName").value,
            cardType: document.getElementById("cardType").value,
            cardNumber: document.getElementById("cardNumber").value,
            expiryMonth: document.getElementById("expiryMonth").value,
            expiryYear: document.getElementById("expiryYear").value,
            cvc: document.getElementById("cvc").value
        };

        localStorage.setItem("orderConfirmation", JSON.stringify(data));

        window.location.href ="orderConfirmation.html?" + window.location.search.substring(1);
    });

});
"use strict";

window.addEventListener("load", function () {

    const data = JSON.parse(localStorage.getItem("orderConfirmation"));

    if (!data) {
        alert("No order information found.");
        window.location.href = "registration.html";
        return;
    }

    document.getElementById("preferredName").value = data.preferredName;
    document.getElementById("fullNames").value = data.fullNames;
    document.getElementById("surname").value = data.surname;
    document.getElementById("cellPhone").value = data.cellPhone;
    document.getElementById("email").value = data.email;
    const id = data.idNumber;
      document.getElementById("idNumber").value =
    id.substring(0, 4) + "*********";
    
    document.getElementById("shippingStreet").value = data.shippingStreet;
    document.getElementById("shippingSuburb").value = data.shippingSuburb;
    document.getElementById("shippingCity").value = data.shippingCity;
    document.getElementById("shippingProvince").value = data.shippingProvince;
    document.getElementById("shippingPostal").value = data.shippingPostal;

    document.getElementById("cardName").value = data.cardName;
    document.getElementById("cardType").value = data.cardType;
    document.getElementById("expiryMonth").value = data.expiryMonth;
    document.getElementById("expiryYear").value = data.expiryYear;
    document.getElementById("cvc").value = data.cvc;
   const card = data.cardNumber;
document.getElementById("cardNumber").value =
    "************" + card.slice(-4);
});
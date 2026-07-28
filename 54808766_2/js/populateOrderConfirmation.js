"use strict";

window.addEventListener("load", function () {

    const data = JSON.parse(localStorage.getItem("orderConfirmation"));
  console.log({data});
    if (!data) {
        alert("No order information found.");
        window.location.href = "registration.html";
        return;
    }

    document.getElementById("preferredName").value = data.preferredName;
    document.getElementById("surname").value = data.surname;
    document.getElementById("cellPhone").value = data.cellPhone;
    document.getElementById("email").value = data.email;
    const id = data.idNumber;
      document.getElementById("idNumber").value =
    id.substring(0, 4) + "*********";

    document.getElementById("cardName").value = data.cardName;
    console.log("cardType",data.cardType);
    console.log("cardName",data.cardName);
    document.getElementById("cardType").value = data.cardType;

   const card = data.cardNumber;
document.getElementById("cardNumber").value =
    "************" + card.slice(-4);
});

const params = new URLSearchParams(window.location.search);

const tbody = document.querySelector("#orderTable tbody");

let subtotal = 0;
let i = 1;

while (params.has("product" + i)) {

    const product = params.get("product" + i);
    const price = Number(params.get("price" + i));
    const qty = Number(params.get("qty" + i));

    // Optional extra cost
    const extra = Number(params.get("extra" + i) || 0);

    const total = (price + extra) * qty;

    subtotal += total;

    tbody.innerHTML += `
        <tr>
            <td>${product}</td>
            <td>R${price.toFixed(2)}</td>
            <td>${qty}</td>
            <td>R${extra.toFixed(2)}</td>
            <td>R${total.toFixed(2)}</td>
        </tr>
    `;

    i++;
}

const vat = subtotal * 0.15;
const grandTotal = subtotal + vat;

document.getElementById("subtotal").textContent =
    "R" + subtotal.toFixed(2);

document.getElementById("vat").textContent =
    "R" + vat.toFixed(2);

document.getElementById("grandTotal").textContent =
    "R" + grandTotal.toFixed(2);

// Confirm Order
document.getElementById("confirmOrder").addEventListener("click", function () {

    const data = JSON.parse(localStorage.getItem("orderConfirmation"));

    const params = new URLSearchParams();

    params.append("preferredName", data.preferredName);
    params.append("surname", data.surname);
    params.append("cellPhone", data.cellPhone);
    params.append("email", data.email);

    const address =
        data.shippingStreet + ", " +
        data.shippingSuburb + ", " +
        data.shippingCity + ", " +
        data.shippingProvince + " " +
        data.shippingPostal;

    params.append("shippingAddress", address);

    params.append("totalCost", document.getElementById("grandTotal").textContent);
    window.location.href = "receipt.html?" + params.toString();

});
// Clear Order
document.getElementById("clearOrder").addEventListener("click", function () {
    localStorage.removeItem("orderConfirmation");
    document.getElementById("orderConfirmationForm").reset();
    document.querySelector("#orderTable tbody").innerHTML = "";
    document.getElementById("subtotal").textContent = "";
    document.getElementById("vat").textContent = "";
    document.getElementById("grandTotal").textContent = "";

});
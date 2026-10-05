"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("orderConfirmation"));

  // Personal details

  document.getElementById("preferredName").value = data.preferredName;

  document.getElementById("fullNames").value = data.fullNames;

  document.getElementById("surname").value = data.surname;

  // Mask ID number
  let id = data.idNumber;
  document.getElementById("idNumber").value = id.substring(0, 4) + "*********";

  document.getElementById("cellPhone").value = data.cellPhone;

  document.getElementById("email").value = data.email;

  // Address
  document.getElementById("shippingStreet").value = data.shippingStreet;

  document.getElementById("shippingSuburb").value = data.shippingSuburb;

  document.getElementById("shippingCity").value = data.shippingCity;

  document.getElementById("shippingProvince").value = data.shippingProvince;

  document.getElementById("shippingPostal").value = data.shippingPostal;

  // Payment

  document.getElementById("cardName").value = data.cardName;

  document.getElementById("cardType").value = data.cardType;

  // Mask card number

  let card = data.cardNumber;

  document.getElementById("cardNumber").value = "************" + card.slice(-4);
  calculateAnddisplayProducts();
});

function calculateAnddisplayProducts() {
  //get the query string
  let params = new URLSearchParams(window.location.search);

  //get the product details
  let products = params.getAll("product");
  let prices = params.getAll("price");
  let quantities = params.getAll("qty");
  let extras = params.getAll("extra");

  let subtotal = 0;

  //loop through the selected products
  for (let i = 0; i < products.length; i++) {
    let price = Number(prices[i]);
    let quantity = Number(quantities[i]);
    let extraCost = Number(extras[i]);

    //calculate the product total
    let productTotal = (price + extraCost) * quantity;

    subtotal += productTotal;

    table.innerHTML += `
    <tr>
        <td>${products[i]}</td>
        <td>R${price.toFixed(2)}</td>
        <td>${quantity}</td>
        <td>R${extraCost.toFixed(2)}</td>
        <td>R${productTotal.toFixed(2)}</td>
    </tr>`;
  }
  //calculate the VAT and total
  let vat = subtotal * 0.15;
  let total = subtotal + vat;

  //display the results
  document.getElementById("vat").textContent = "R" + vat.toFixed(2);
  document.getElementById("orderTotal").textContent = "R" + total.toFixed(2);
}

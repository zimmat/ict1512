"use strict";

document.addEventListener("DOMContentLoaded", () => {
const data = JSON.parse(localStorage.getItem("orderConfirmation"));

if (!data) {
    alert("No customer information was found.");
    window.location.href = "registration.html";
    return;
}

// Personal details
document.getElementById("preferredName").value = data.preferredName || "";
document.getElementById("surname").value = data.surname || "";
document.getElementById("idNumber").value = data.idNumber || "";
document.getElementById("cellPhone").value = data.cellPhone || "";
document.getElementById("email").value = data.email || "";

// Shipping address
document.getElementById("shippingStreet").value = data.shippingStreet || "";
document.getElementById("shippingSuburb").value = data.shippingSuburb || "";
document.getElementById("shippingCity").value = data.shippingCity || "";
document.getElementById("shippingProvince").value = data.shippingProvince || "";
document.getElementById("shippingPostal").value = data.shippingPostal || "";

// Payment details
document.getElementById("cardName").value = data.cardName || "";
document.getElementById("cardType").value = data.cardType || "";

// The registration JavaScript currently stores only the last 4 digits.
const card = data.cardNumber || "";

if (card.length === 4) {
    document.getElementById("cardNumber").value = "************" + card;
} else {
    document.getElementById("cardNumber").value =
        "************" + card.slice(-4);
}

calculateAndDisplayProducts();

});

function calculateAndDisplayProducts() {
const params = new URLSearchParams(window.location.search);
console.log("Query string parameters:", params.toString());

// Get product details from the query string
const products = params.getAll("product");
const prices = params.getAll("price");
const quantities = params.getAll("qty");
const extras = params.getAll("extra");

const tableBody = document.querySelector("#orderTable tbody");

let subtotal = 0;

// Clear existing rows
tableBody.innerHTML = "";

// Loop through selected products
for (let i = 1; ; i++) { 
    const product = params.get(`product${i}`);
    console.log(`Product ${i}:`, product); // Log each product for debugging
 // Stop when there are no more products 
 if (!product) {
     break; 
    }
  const price = Number(params.get(`price${i}`)) || 0; 
  const quantity = Number(params.get(`qty${i}`)) || 0; 
  const extraCost = Number(params.get(`extra${i}`)) || 0;

   // Calculate total for this product 
   const productTotal = (price  * quantity) + extraCost; 
   subtotal += productTotal; 
   tableBody.innerHTML += ` <tr>
    <td>${product}</td> 
    <td>R${price.toFixed(2)}</td>
     <td>${quantity}</td>
      <td>R${extraCost.toFixed(2)}</td> 
      <td>R${productTotal.toFixed(2)}</td>
       </tr> `; }

// Calculate VAT and grand total
const vat = subtotal * 0.15;
const total = subtotal + vat;

// Display totals
document.getElementById("subtotal").textContent =
    "R" + subtotal.toFixed(2);

document.getElementById("vat").textContent =
    "R" + vat.toFixed(2);

document.getElementById("grandTotal").textContent =
    "R" + total.toFixed(2);

}

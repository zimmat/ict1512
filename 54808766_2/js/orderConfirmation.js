"use strict";


document.addEventListener("DOMContentLoaded", () => {
const data = JSON.parse(
localStorage.getItem("orderConfirmation")
);


// Personal details

document.getElementById("preferredName").value =
data.preferredName;

document.getElementById("fullNames").value =
data.fullNames;

document.getElementById("surname").value =
data.surname;

// Mask ID number
let id = data.idNumber;
document.getElementById("idNumber").value =
id.substring(0,4) + "*********";

document.getElementById("cellPhone").value =
data.cellPhone;

document.getElementById("email").value =
data.email;



// Address
document.getElementById("shippingStreet").value =
data.shippingStreet;

document.getElementById("shippingSuburb").value =
data.shippingSuburb;

document.getElementById("shippingCity").value =
data.shippingCity;

document.getElementById("shippingProvince").value =
data.shippingProvince;

document.getElementById("shippingPostal").value =
data.shippingPostal;



// Payment

document.getElementById("cardName").value =
data.cardName;


document.getElementById("cardType").value =
data.cardType;


// Mask card number

let card = data.cardNumber;

document.getElementById("cardNumber").value =
"************" + card.slice(-4);



displayProducts();



});



function displayProducts(){


let params = new URLSearchParams(
window.location.search
);


let products =
params.getAll("product");


let prices =
params.getAll("price");


let quantities =
params.getAll("quantity");



let table =
document.getElementById("orderItems");


let subtotal = 0;



for(let i=0; i < products.length; i++){


let price =
Number(prices[i]);


let quantity =
Number(quantities[i]);



let extraCost = 0;


let productTotal =
(price * quantity) + extraCost;



subtotal += productTotal;



let row =
`
<tr>

<td>${products[i]}</td>

<td>R${price.toFixed(2)}</td>

<td>${quantity}</td>

<td>R${extraCost.toFixed(2)}</td>

<td>R${productTotal.toFixed(2)}</td>

</tr>
`;



table.innerHTML += row;


}



let vat =
subtotal * 0.15;


let total =
subtotal + vat;



document.getElementById("vat").textContent =
vat.toFixed(2);



document.getElementById("orderTotal").textContent =
total.toFixed(2);


}
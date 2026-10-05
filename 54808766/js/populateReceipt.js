"use strict";

const params = new URLSearchParams(window.location.search);

const preferredName = params.get("preferredName");
const surname = params.get("surname");
const cellPhone = params.get("cellPhone");
const email = params.get("email");
const shippingAddress = params.get("shippingAddress");
const totalCost = params.get("totalCost");

document.getElementById("preferredName").textContent = preferredName;
document.getElementById("surname").textContent = surname;

document.getElementById("cellPhone").textContent = cellPhone.startsWith("0") ? "+27" + cellPhone.slice(1): "+27" + cellPhone;

document.getElementById("email").textContent = email;
document.getElementById("shippingAddress").textContent = shippingAddress;
document.getElementById("totalCost").textContent = totalCost;
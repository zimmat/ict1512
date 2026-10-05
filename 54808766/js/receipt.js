const params = new URLSearchParams(window.location.search);
const cellPhone = params.get("cellPhone");
document.getElementById("preferredName").textContent =params.get("preferredName");
document.getElementById("surname").textContent =params.get("surname");
document.getElementById("cellPhone").textContent = cellPhone.startsWith("0") ? "+27" + cellPhone.slice(1) : "+27" + params.get("cellPhone");
document.getElementById("email").textContent = params.get("email");
document.getElementById("shippingAddress").textContent = params.get("shippingAddress");
document.getElementById("totalCost").textContent = "R" + Number(params.get("total")).toFixed(2);
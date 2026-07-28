const params = new URLSearchParams(window.location.search);
const cellPhone = params.get("cellPhone");
document.getElementById("preferredName").textContent =
    params.get("preferredName");

document.getElementById("surname").textContent =
    params.get("surname");

document.getElementById("cellPhone").textContent = cellPhone.startsWith("0") ? "+27" + cellPhone.slice(1) : "+27" +
    params.get("cellPhone");

document.getElementById("email").textContent =
    params.get("email");

document.getElementById("street").textContent =
    params.get("street");

document.getElementById("suburb").textContent =
    params.get("suburb");

document.getElementById("city").textContent =
    params.get("city");

document.getElementById("province").textContent =
    params.get("province");

document.getElementById("postal").textContent =
    params.get("postal");

document.getElementById("total").textContent =
    "R" + Number(params.get("total")).toFixed(2);
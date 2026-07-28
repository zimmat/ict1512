"use strict";

// Set up quantity controls
document.querySelectorAll(".product").forEach(product => {

    const plus = product.querySelector(".plus-btn");
    const minus = product.querySelector(".minus-btn");
    const qty = product.querySelector(".qty");
    const checkbox = product.querySelector(".productCheck");

    let quantity = 0;

    plus.addEventListener("click", function () {

        quantity++;

        qty.textContent = quantity;

        checkbox.checked = true;

        qty.style.display = "block";
        minus.style.display = "block";

    });

    minus.addEventListener("click", function () {

        if (quantity > 0) {
            quantity--;
            qty.textContent = quantity;
        }

        if (quantity === 0) {

            checkbox.checked = false;

            qty.style.display = "none";
            minus.style.display = "none";
        }

    });

});


// Submit order
document.getElementById("productsForm").onsubmit = function (e) {

    e.preventDefault();

    const params = new URLSearchParams();

    let productCount = 1;

   document.querySelectorAll(".product").forEach(product => {

    const checkbox = product.querySelector(".productCheck");
    const qty = Number(product.querySelector(".qty").textContent);

    const extraCheck = product.querySelector('input[type="checkbox"]:not(.productCheck)');
    let extra = 0;

    if (extraCheck && extraCheck.checked) {
        extra = Number(extraCheck.dataset.price);
    }

    if (checkbox.checked && qty > 0) {

        params.append("product" + productCount, checkbox.dataset.name);
        params.append("price" + productCount, checkbox.dataset.price);
        params.append("qty" + productCount, qty);
        params.append("extra" + productCount, extra);

        productCount++;
    }

});
    if (productCount === 1) {

        alert("Please select at least one product.");
        return;

    }

    window.location.href =
        "orderConfirmation.html?" + params.toString();

};
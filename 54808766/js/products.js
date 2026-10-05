
"use strict";

window.addEventListener("load", function () {

    const products = document.querySelectorAll(".product");
    const placeOrderButton = document.querySelector(".order-btn");

    // Set up product quantity controls
    products.forEach(function (product) {

        const checkbox = product.querySelector(".productCheck");
        const minusButton = product.querySelector(".minus-btn");
        const plusButton = product.querySelector(".plus-btn");
        const quantityDisplay = product.querySelector(".qty");
        const extraCheckbox = product.querySelector(".extraCheck");

        let quantity = 0;

        checkbox.addEventListener("change", function () {
            if (checkbox.checked && quantity === 0) {
                quantity = 1;
            }

            if (!checkbox.checked) {
                quantity = 0;

                if (extraCheckbox) {
                    extraCheckbox.checked = false;
                }
            }

            quantityDisplay.textContent = quantity;
        });

        plusButton.addEventListener("click", function () {
            quantity++;
            checkbox.checked = true;
            quantityDisplay.textContent = quantity;
        });

        minusButton.addEventListener("click", function () {
            if (quantity > 0) {
                quantity--;
            }

            quantityDisplay.textContent = quantity;

            if (quantity === 0) {
                checkbox.checked = false;

                if (extraCheckbox) {
                    extraCheckbox.checked = false;
                }
            }
        });

        if (extraCheckbox) {
            extraCheckbox.addEventListener("change", function () {
                if (extraCheckbox.checked && !checkbox.checked) {
                    checkbox.checked = true;

                    if (quantity === 0) {
                        quantity = 1;
                        quantityDisplay.textContent = quantity;
                    }
                }
            });
        }
    });

    // Place order and open confirmation page
    placeOrderButton.addEventListener("click", function (event) {

        event.preventDefault();

        const selectedProducts = [];

        products.forEach(function (product) {

            const checkbox = product.querySelector(".productCheck");
            const quantity = Number(
                product.querySelector(".qty").textContent
            );
            const extraCheckbox = product.querySelector(".extraCheck");

            if (checkbox.checked && quantity > 0) {

                const extra = extraCheckbox && extraCheckbox.checked
                    ? Number(extraCheckbox.dataset.price || 0)
                    : 0;

                selectedProducts.push({
                    name: checkbox.dataset.name,
                    price: Number(checkbox.dataset.price),
                    quantity: quantity,
                    extra: extra
                });
            }
        });

        // Require at least two different products
        if (selectedProducts.length < 2) {
            alert("Please select at least two different products.");
            return;
        }

        const params = new URLSearchParams();

        selectedProducts.forEach(function (product, index) {

            const number = index + 1;

            params.append("product" + number, product.name);
            params.append("price" + number, product.price);
            params.append("qty" + number, product.quantity);
            params.append("extra" + number, product.extra);
        });

        window.location.href =
            "orderConfirmation.html?" + params.toString();
    });
});
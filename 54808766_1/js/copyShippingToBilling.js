// function copyShippingToBilling() {
//       document.getElementById('billingStreet').value = document.getElementById('shippingStreet').value;
//       document.getElementById('billingSuburb').value = document.getElementById('shippingSuburb').value;
//       document.getElementById('billingCity').value = document.getElementById('shippingCity').value;
//       document.getElementById('billingProvince').value = document.getElementById('shippingProvince').value;
//       document.getElementById('billingPostal').value = document.getElementById('shippingPostal').value;
//     }
//     function toggleCopyAddress(checkbox) {
//       if (checkbox.checked) {
//         copyShippingToBilling();
//       } else {
//         document.getElementById('billingStreet').value = '';
//         document.getElementById('billingSuburb').value = '';
//         document.getElementById('billingCity').value = '';
//         document.getElementById('billingProvince').value = '';
//         document.getElementById('billingPostal').value = '';
//       }
//     }

function synchronizeBillingAddress() { 
 const isChecked = document.getElementById("copyAddress").checked; 
 
  const fields = [
        ["shippingStreet", "billingStreet"],
        ["shippingSuburb", "billingSuburb"],
        ["shippingCity", "billingCity"],
        ["shippingProvince", "billingProvince"],
        ["shippingPostal", "billingPostal"]
    ]; 
 
 fields.forEach(field => { 
    const shipping = document.getElementById(shippingId);
    const billing = document.getElementById(billingId);
 
 if (isChecked) { 
 billInput.value = shipInput.value; 
 // Handle dropdown evaluation adjustments if copying 
 if (shipInput.tagName === "SELECT") { 
 billInput.value = shipInput.value; 
 } 
 // Set fields as read-only to prevent confusion 
 billInput.setAttribute("readonly", "true"); 
 } else { 
 billInput.value = ""; 
 billInput.removeAttribute("readonly"); 
 } 
 }); 
}

// function synchronizeBillingAddress() {
//   const isChecked = document.getElementById("sameAsShipping").checked;

//   const fields = ["Street", "Line2", "City", "Province", "Country", "Postal"];

//   fields.forEach(field => {
//     const shipInput = document.getElementById("ship" + field);
//     const billInput = document.getElementById("bill" + field);

//     if (!shipInput || !billInput) return;

//     if (isChecked) {
//       billInput.value = shipInput.value;

//       if (billInput.tagName === "SELECT") {
//         billInput.disabled = true;
//       } else {
//         billInput.setAttribute("readonly", "true");
//       }
//     } else {
//       billInput.value = "";

//       if (billInput.tagName === "SELECT") {
//         billInput.disabled = false;
//       } else {
//         billInput.removeAttribute("readonly");
//       }
//     }
//   });
// }
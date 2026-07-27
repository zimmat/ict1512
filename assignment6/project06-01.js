"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Project 06-01

      Project to validate a form used for setting up a new account
      Author: Zimkhitha Matshangaza
      Date: 15 June 2026

      Filename: project06-01.js
*/

// Declare variables
let submitButton = document.getElementById("submitButton");
let pwd = document.getElementById("pwd");
let pwd2 = document.getElementById("pwd2");

// Create click event listener
submitButton.addEventListener("click", function() {

   // Check whether password matches the pattern
   if (pwd.validity.patternMismatch) {
      pwd.setCustomValidity(
         "Your password must be at least 8 characters with at least one letter and one number"
      );

   // Check whether passwords match
   } else if (pwd.value !== pwd2.value) {
      pwd.setCustomValidity("Your passwords must match");

   // Password is valid
   } else {
      pwd.setCustomValidity("");
   }

   pwd.reportValidity();
}); 
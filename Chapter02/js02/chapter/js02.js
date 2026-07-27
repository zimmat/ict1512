/*    JavaScript 7th Edition
      Chapter 2
      Chapter case

      Fan Trick Fine Art Photography
      Variables and functions
      Author: 
      Date:   

      Filename: js02.js
 */

//Declare global constants for the application
const EMP_COST = 100; //cost of photographer per hour
const BOOK_COST = 350; //cost of memory book
const REPO_COST = 1250; //cost of reproduction rights
const TRAVEL_COST = 2.50; //cost of travel per mile



// set up the form when the page loads
window.addEventListener("load", setUpForm);

// set the form's default values
function setUpForm() {
      document.getElementById("photoNum").value = 1;
      document.getElementById("photoHrs").value = 2;
      document.getElementById("makeBook").checked = false;
      document.getElementById("photoRights").checked = false;
      document.getElementById("photoDist").value = 0;

      getEstimate();

      // Add event handler for each form control
      document.getElementById("photoNum").onchange = getEstimate;
      document.getElementById("photoHrs").onchange = getEstimate;
      document.getElementById("makeBook").onchange = getEstimate;
      document.getElementById("photoRights").onchange = getEstimate;
      document.getElementById("photoDist").onchange = getEstimate;

}

//Estimate the total cost of the service
function getEstimate() {
      let totalCost = 0;

      
      let photographers = document.getElementById("photoNum").value;
      let hours = document.getElementById("photoHrs").value;
      let distance = document.getElementById("photoDist").value;
      let buyBook = document.getElementById("makeBook").checked;
      let buyRights = document.getElementById("photoRights").checked;

      // Add the cost of the photographer's for hours covered
      totalCost += photographers * hours * EMP_COST;

      //Add total cost of distance per photographer per mile
      totalCost += photographers * distance * TRAVEL_COST;

      //Add the cost of the book if purchased
      totalCost += buyBook ? BOOK_COST : 0;

      //Add the cost of reproduction rights if purchased
      totalCost += buyRights ? REPO_COST : 0;

      //Display the total cost in the form
      document.getElementById("estimate").innerHTML = "$" + totalCost;

}


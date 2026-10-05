"use strict";

/*
    Author: Zimkhitha Matshangaza
    Filename: staff.js

    Loads staff details from JSON file
*/

// Load staff directory
fetch("data/staff.json")
  .then(response => response.json())
  .then(data => {
    console.log({data});
   
    // Populate staff gallery
    const staffGallery = document.getElementById("staffGallery");
 
    // Loop through staff directory
    data.staffDirectory.forEach(staff => {
    
      // Create figure
      let figure = document.createElement("figure");
      figure.innerHTML = `
        <img 
          src="images/${staff.firstName.toLowerCase()}.png"
          alt="${staff.firstName} ${staff.lastName}"
        />

        <figcaption>

          <strong>
            ${staff.firstName} ${staff.lastName}
          </strong>

          <br>

          ${staff.jobDescription}

          <br><br>

          Staff Number: ${staff.staffNumber}

          <br>

          Phone: ${staff.workPhoneNumber}

          <br>

          Email: ${staff.workEmailAddress}

        </figcaption>
      `;
     // Add figure to staff gallery
      staffGallery.appendChild(figure);

    });

  }).catch(error => {
    console.error("Error loading staff directory:", error);
  });
"use strict";

/*
    Author: Zimkhitha Matshangaza
    Filename: staff.js

    Loads staff details from JSON file
*/


fetch("data/staff.json")
  .then(response => response.json())
  .then(data => {
    console.log({data});

    const staffGallery = document.getElementById("staffGallery");

    data.staffDirectory.forEach(staff => {

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

      staffGallery.appendChild(figure);

    });

  })
  .catch(error => {
    console.error("Error loading staff directory:", error);
  });
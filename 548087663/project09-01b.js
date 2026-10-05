"use strict";
/*    JavaScript 7th Edition
      Chapter 9
      Project 09-01

      Project to read field values from a query string
      Author: Zimkhitha Matshangaza
      Date: 25 July 2026  

      Filename: project09-01b.js
*/

//Get the query string
let query = location.search.slice(1);

//Replace all + characters with spaces
query = query.replace(/\+/g, " ");

//Decode the remaining special characters
query = decodeURIComponent(query);

//Split the query string into name/value pairs
let cardFields = query.split(/&/g);

//Loop through the name/value pairs
for (let items of cardFields) {
   let nameValue = items.split(/=/);
   let name = nameValue[0];
   let value = nameValue[1];
   //Assign the value to the corresponding field
  document.getElementById(name).textContent = value;
}
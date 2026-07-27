/*    JavaScript 7th Edition
     Chapter 3
     Chapter case

     Tipton Turbines
     Program to display games results in a web table
     Author: 
     Date:   

     Filename: js03.js
 */

//Days of the week array
let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Add event listener to load the weekDays 
window.addEventListener("load", addWeekDays);

//Function to write weekdays into the calendar 
function addWeekDays() {
    let i = 0;
    // reference the collection of the heading cells
    let headCells = document.getElementsByTagName("th");

    //write each of the seven days of the week into the heading cell
    while (i < 7) {
        headCells[i].innerHTML = weekDays[i];

        //increment the counter
        i++;
    }

}

window.addEventListener("load", showGames);

//Function to display the game results
function showGames() {
    for (let i = 0; i < gameDates.length; i++) {
        let gameInfo = "";
        //Open the paragraph
        switch (gameResults[i]) {
            case "W":
                gameInfo += "<p class='win'>";
                break;
            case "L":
                gameInfo += "<p class='loss'>";
                break;
            case "S":
                gameInfo += "<p class='suspended'>";
                break;
            case "P":
                gameInfo += "<p class='postponed'>";
                break;
        }
        // Display the game location
        if (gameLocations[i] === "h") {
            gameInfo += "vs. ";
        } else if (gameLocations[i] === "a") {
            gameInfo += "@ ";
        }

        //Include the opponet
        gameInfo += gameOpponents[i] + "<br>";

        //Include the results and score
        gameInfo += gameResults[i] + " : (" + runsScored[i] + " - " + runsAllowed[i] + ")";

        //Display innings played for suspended, shortened, or extrainning games
        if(gameInnings[i] < 5){
            gameInfo += "[ " + gameInnings[i] + " ] ***";
        } else if(gameInnings[i] < 9){
            gameInfo += "[ " + gameInnings[i] + " ] **";

        } else if(gameInnings[i] > 9){
            gameInfo += "[ " + gameInnings[i] + " ] ";
        }

        //Close the paragraph
        gameInfo += "</p>";


        // Write the information into the table cell
        let tableCell = document.getElementById(gameDates[i]);
        tableCell.insertAdjacentHTML("beforeend", gameInfo);
    }
}

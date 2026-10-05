"use strict";

window.addEventListener("load", function () {

    const lastVisit = localStorage.getItem("lastVisit");
    const message = document.getElementById("lastVisited");
     console.log("message",message);

    if (lastVisit !== null) {
        message.textContent = "Your last visit was: " + lastVisit;
    } else {
        message.textContent = "Your last visit was:" + new Date().toLocaleString();
    }

    const today = new Date().toLocaleString();

    localStorage.setItem("lastVisit", today);

});
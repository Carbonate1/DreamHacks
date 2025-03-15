// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("locationChoice").addEventListener("submit", submitLocation);
// });

// function submitLocation() {
//     let choice = document.getElementById("locationChoice").value;
//     let manualInput = document.getElementById("manualLocationForm").value;

//     if (choice === "yes") {
//         getLocation();  // Fetch and display user's location
//         return;  // Prevent further processing
//     }

//     if (choice === "manual") {
//         if (manualInput.trim() === "") {
//             alert("Please enter a valid location.");
//         }
//     } else {
//         document.getElementById("location").innerHTML = "Please select an option and submit.";
//     }
// }

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         document.getElementById("location").innerHTML = "Geolocation is not supported by your browser.";
//     }
// }

// function showPosition(position) {
//     let lat = position.coords.latitude;
//     let lng = position.coords.longitude;
//     let mapEmbed = `
//     <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
//         <iframe 
//             width="700" height="400" 
//             frameborder="0" style="border:0; display: block; margin: auto;" 
//             allowfullscreen
//             src="https://www.google.com/maps/embed/v1/view?key=${API_KEY}&center=${lat},${lng}&zoom=14">
//         </iframe>
//     </div>`;

//     document.getElementById("location").innerHTML = `
//     <strong>Your Current Location:</strong><br>
//     ${mapEmbed}
//     `;
// }


// function showError(error) {
//     switch (error.code) {
//         case error.PERMISSION_DENIED:
//             document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
//             break;
//         case error.POSITION_UNAVAILABLE:
//             document.getElementById("location").innerHTML = "Location information is unavailable.";
//             break;
//         case error.TIMEOUT:
//             document.getElementById("location").innerHTML = "The request to get user location timed out.";
//             break;
//         case error.UNKNOWN_ERROR:
//             document.getElementById("location").innerHTML = "An unknown error occurred.";
//             break;
//     }
// }


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".current-location-btn").addEventListener("click", getLocation);
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("myMenu").innerHTML = "Geolocation is not supported by your browser.";
    }
}


function showPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    let mapEmbed = `
    <iframe 
        width="90%" height="400" 
        frameborder="0" style="border:0; display: block; margin: auto;" 
        allowfullscreen
        src="https://www.google.com/maps/embed/v1/view?key=AIzaSyDh6tJIy8JleYWD59RKJgLcli2Hazn2rA8&center=${lat},${lng}&zoom=14">
    </iframe>`;

    document.getElementById("map-container").innerHTML = mapEmbed;
}

function showError(error) {
    let errorMessage;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
    }
    document.getElementById("map-container").innerHTML = `<p>${errorMessage}</p>`;
}
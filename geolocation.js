document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("locationChoice").addEventListener("submit", submitLocation);
});

// function handleSelection() {
//     let choice = document.getElementById("locationChoice").value;
//     let manualInputForm = document.getElementById("manualLocationForm");

//     // Show the manual input form only if "manual" is selected
//     if (choice === "manual") {
//         manualInputForm.style.display = "block";
//     } else {
//         manualInputForm.style.display = "none";
//     }
// }

function submitLocation() {
    let choice = document.getElementById("locationChoice").value;
    let manualInput = document.getElementById("manualLocationForm").value;

    if (choice === "yes") {
        getLocation();  // Fetch and display user's location
        return;  // Prevent further processing
    }

    if (choice === "manual") {
        if (manualInput.trim() === "") {
            alert("Please enter a valid location.");
        }
    } else {
        document.getElementById("location").innerHTML = "Please select an option and submit.";
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by your browser.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    let mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

    document.getElementById("location").innerHTML = `
        <strong>Your Current Location:</strong><br>
        <a href="${mapLink}" target="_blank">View on Google Maps</a>
    `;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}

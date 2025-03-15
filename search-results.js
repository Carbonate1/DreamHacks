async function fetchStudyLocations() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let lat = urlParams.get('latitude');
    let lng = urlParams.get('longitude');

    if (!lat) lat = 49.188053;
    if (!lng) lng = -122.849909;

    require('dotenv').config();

    const apiKey = process.env.API_KEY;
    const radius = 3000;  // Adjust as needed (in meters)
    // IMPORTANT: Max radius is 50km. Try to stay under 10km
    const keyword = "study";
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== "OK") {
            console.error("Error fetching places:", data.status, data.error_message);
            return;
        }

        } catch (error) {
            console.error("Failed to fetch study locations:", error);
        }
        displayResults(data.results);
}

function displayResults(places) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    if (places.length === 0) {
        resultsList.innerHTML = "<li>No study spots found.</li>";
        return;
    }

    places.forEach(place => {
        const listItem = document.createElement("li");
        listItem.textContent = place.name;
        resultsList.appendChild(li);
    });
}

// Run when the page loads
fetchStudyLocations();

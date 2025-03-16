async function fetchLocations() {
    const radius = 3000;  // Adjust as needed (in meters)
    // IMPORTANT: Max radius is 50km. Try to stay under 10km
    const allowedTypes = ["bakery", "cafe", "library", "restaurant", "shopping_mall", "university"];
    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&fields=name,types,opening_hours,geometry&key=${API_KEY}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== "OK") {
            console.error("Error fetching places:", data.status, data.error_message);
            return;
        }

        studyLocations = filterResults(data);
        // console.log(studyLocations);
        // displayResults(studyLocations);
    
    } catch (error) {
        console.error("Failed to fetch study locations:", error);
    }
    displayResults(studyLocations);
}

function filterResults(places) {
    const currentTime = new Date();
      
    // Filter and structure data
    const studyLocations = data.results
        .filter(place => 
            place.types.some(type => allowedTypes.includes(type)) &&
            place.opening_hours?.open_now // Check if currently open
        )
        .map(place => ({
            name: place.name,
            location: place.geometry.location, // { lat, lng }
            openingHours: place.opening_hours ? place.opening_hours.weekday_text : "No opening hours available",
            reviews: place.reviews ? place.reviews.slice(0, 20).map(review => review.text) : []
        }));
    return studyLocations;
}

function displayResults(places) {
    const resultsList = document.getElementById("results");
    resultsList.innerHTML = "";

    if (places.length === 0) {
        resultsList.innerHTML = "<li>No study spots found.</li>";
        return;
    }

    places.forEach(place => {
        const listItem = document.createElement("listItem");
        listItem.textContent = place.name;
        resultsList.appendChild(listItem);
    });
}
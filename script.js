// Initialize the map with your school campus coordinates
const map = L.map('map').setView([51.505, -0.09], 13); // Replace with your campus coordinates

// Add tile layer (OpenStreetMap in this case)
L.tileLayer('https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_4/v1661938386/bosco/gj9ncox3wdkzh3cbmn6m/Campus-MAP.jpg').addTo(map);

// Coordinates of markers (adjust later)
const locations = [
  { lat: 51.505, lng: -0.09, name: "Library", imageUrl: "https://example.com/library-image.jpg" },
  { lat: 51.515, lng: -0.1, name: "Cafeteria", imageUrl: "https://example.com/cafeteria-image.jpg" },
  { lat: 51.525, lng: -0.11, name: "Gym", imageUrl: "https://example.com/gym-image.jpg" }
];

// Create markers and add event handlers
locations.forEach(location => {
  const marker = L.marker([location.lat, location.lng]).addTo(map);
  
  // Show image when hovering over the marker
  marker.on('mouseover', () => {
    const popup = L.popup()
      .setLatLng([location.lat, location.lng])
      .setContent(`<img src="${location.imageUrl}" alt="${location.name}" width="300" />`)
      .openOn(map);
  });
  
  // Event click to show event form
  marker.on('click', () => {
    showEventForm(marker, location);
  });
});

// Function to display the event form
function showEventForm(marker, location) {
  const eventInfoDiv = document.getElementById('eventInfo');
  eventInfoDiv.style.display = 'block';

  const eventList = document.getElementById('eventsList');
  const newEventItem = document.createElement('li');
  
  newEventItem.innerHTML = `
    <strong>${location.name}</strong><br>
    <input type="text" id="eventName" placeholder="Event name" /><br>
    <input type="text" id="eventDescription" placeholder="Event description" /><br>
    <button onclick="addEvent(${marker.getLatLng().lat}, ${marker.getLatLng().lng})">Add Event</button>
  `;
  eventList.appendChild(newEventItem);
}

// Function to add event under the marker
function addEvent(lat, lng) {
  const eventName = document.getElementById('eventName').value;
  const eventDescription = document.getElementById('eventDescription').value;

  // You can enhance this to save events to a database or localStorage

  const eventMarker = L.marker([lat, lng]).addTo(map);
  eventMarker.bindPopup(`<strong>${eventName}</strong><br>${eventDescription}`).openPopup();

  alert("Event added successfully!");
}


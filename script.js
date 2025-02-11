// Initialize the map (replace with your campus coordinates and zoom level)
const map = L.map('map').setView([51.505, -0.09], 13); // Replace with your school's coordinates

// Add the main campus map image as the background (Image Overlay)
const imageUrl = 'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1661938386/bosco/gj9ncox3wdkzh3cbmn6m/Campus-MAP.jpg'; // <-- Replace with your campus map image URL
const imageBounds = [[51.49, -0.08], [51.52, -0.06]]; // Adjust these bounds to fit your campus map
L.imageOverlay(imageUrl, imageBounds).addTo(map);

// Add OpenStreetMap tiles on top of the campus image, if desired (or leave this off to just use the campus image)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Coordinates of markers (adjust later)
const locations = [
  { 
    lat: 51.505, 
    lng: -0.09, 
    name: "Library", 
    imageUrl: "https://yourdomain.com/images/library.jpg" // <-- Replace with your image URL
  },
  { 
    lat: 51.515, 
    lng: -0.1, 
    name: "Cafeteria", 
    imageUrl: "https://yourdomain.com/images/cafeteria.jpg" // <-- Replace with your image URL
  },
  { 
    lat: 51.525, 
    lng: -0.11, 
    name: "Gym", 
    imageUrl: "https://yourdomain.com/images/gym.jpg" // <-- Replace with your image URL
  }
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

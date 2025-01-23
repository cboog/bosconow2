document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events");
    const eventLocationSelect = document.getElementById("event-location");
    const addEventButton = document.getElementById("add-event-button");

    // Predefined locations
    const locations = {
        "Library": { x: 50, y: 20 },
        "Gym": { x: 70, y: 40 },
        "Auditorium": { x: 30, y: 60 }
    };

    // Add locations to dropdown
    Object.keys(locations).forEach(location => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        eventLocationSelect.appendChild(option);
    });

    // Array to store events
    const events = [];

    // Render events on the map
    function renderEvents() {
        eventsContainer.innerHTML = ""; // Clear existing markers
        events.forEach(event => {
            const marker = document.createElement("div");
            marker.className = "event-marker";
            marker.style.left = `${locations[event.location].x}%`;
            marker.style.top = `${locations[event.location].y}%`;
            marker.textContent = `${event.type}\n${event.time}`;
            eventsContainer.appendChild(marker);
        });
    }

    // Add new event
    addEventButton.addEventListener("click", () => {
        const location = eventLocationSelect.value;
        const type = document.getElementById("event-type").value; // Get event type from text input
        const time = document.getElementById("event-time").value;

        if (location && type && time) {
            events.push({ location, type, time }); // Save event
            renderEvents(); // Update map
        } else {
            alert("Please fill out all fields!");
        }
    });

    renderEvents(); // Initial render
});

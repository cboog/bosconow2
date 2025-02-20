// Example markers structure to simulate data storage
const markers = {
  "marker-1": { events: [] },
  "marker-2": { events: [] },
  "marker-3": { events: [] },
  "marker-4": { events: [] },
  "marker-5": { events: [] },
  "marker-6": { events: [] },
  "marker-7": { events: [] },
  "marker-8": { events: [] },
  "marker-9": { events: [] },
  "marker-10": { events: [] },
  "marker-11": { events: [] },
};

// Function to add an event to a marker
function addEventToMarker(location, eventName, eventHour, eventMinute, eventPeriod) {
  if (!eventName || eventHour === "" || eventMinute === "") {
    console.error("Please enter all event details.");
    return;
  }

  eventHour = String(eventHour).padStart(2, '0');
  eventMinute = String(eventMinute).padStart(2, '0');
  const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;

  const marker = markers[location];
  if (!marker) {
    console.error("Invalid location selected.");
    return;
  }

  const event = { name: eventName, time: eventTime };
  marker.events.push(event);

  console.log(`Event Added: ${eventName} at ${eventTime}`);
  return marker;
}

// Handle event form submission
document.getElementById("add-event-button").addEventListener("click", function () {
  const location = document.getElementById("event-location").value;
  const eventName = document.getElementById("event-name").value;
  const eventHour = document.getElementById("event-hour").value;
  const eventMinute = document.getElementById("event-minute").value;
  const eventPeriod = document.getElementById("event-period").value;

  addEventToMarker(location, eventName, eventHour, eventMinute, eventPeriod);
});

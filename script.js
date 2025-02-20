// Replace this with a function that processes the event data
function addEventToMarker(location, eventName, eventHour, eventMinute, eventPeriod) {
  // Validate input
  if (!eventName || eventHour === "" || eventMinute === "") {
    throw new Error("Please enter all event details.");
  }

  // Format time correctly
  eventHour = String(eventHour).padStart(2, '0');
  eventMinute = String(eventMinute).padStart(2, '0');
  const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;

  // Simulate the marker (this would be a data structure representing the marker)
  const marker = getMarkerByLocation(location);
  if (!marker) {
    throw new Error("Invalid location selected.");
  }

  // You could now store this event data in a database (Firebase, KV, etc.)
  const event = {
    name: eventName,
    time: eventTime
  };

  // Add the event to the marker data (this assumes `marker` is an object)
  marker.events = marker.events || [];
  marker.events.push(event);

  // Return updated marker (to be saved or displayed in the UI on your front-end)
  return marker;
}

// This would simulate looking up a marker by its location identifier
function getMarkerByLocation(location) {
  // Example marker structure, in reality you would look this up from your data source
  const markers = {
    "location1": { id: "location1", name: "Marker 1", events: [] },
    "location2": { id: "location2", name: "Marker 2", events: [] }
  };

  return markers[location] || null;
}

// Example function usage
try {
  const marker = addEventToMarker("location1", "Math Exam", "10", "30", "AM");
  console.log("Event added:", marker);
} catch (error) {
  console.error("Error:", error.message);
}

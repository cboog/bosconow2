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
    return { error: "Please enter all event details." };
  }

  eventHour = String(eventHour).padStart(2, '0');
  eventMinute = String(eventMinute).padStart(2, '0');
  const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;

  const marker = markers[location];
  if (!marker) {
    return { error: "Invalid location selected." };
  }

  const event = { name: eventName, time: eventTime };
  marker.events.push(event);

  return { success: `Event Added: ${eventName} at ${eventTime}`, marker };
}

// Cloudflare Worker API Handler
export default {
  async fetch(request) {
    if (request.method === "POST") {
      try {
        const { location, eventName, eventHour, eventMinute, eventPeriod } = await request.json();
        const result = addEventToMarker(location, eventName, eventHour, eventMinute, eventPeriod);
        return new Response(JSON.stringify(result), {
          headers: { "content-type": "application/json" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request body" }), { status: 400 });
      }
    }

    // Return markers data for GET requests
    return new Response(JSON.stringify(markers), {
      headers: { "content-type": "application/json" },
    });
  },
};

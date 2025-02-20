document.getElementById("add-event-button").addEventListener("click", function() {
  const location = document.getElementById("event-location").value;
  const eventName = document.getElementById("event-name").value.trim();
  let eventHour = document.getElementById("event-hour").value;
  let eventMinute = document.getElementById("event-minute").value;
  const eventPeriod = document.getElementById("event-period").value;

  // Validate input
  if (!eventName || eventHour === "" || eventMinute === "") {
    alert("Please enter all event details.");
    return;
  }

  // Format time correctly
  eventHour = String(eventHour).padStart(2, '0');
  eventMinute = String(eventMinute).padStart(2, '0');
  const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;

  // Get the corresponding marker
  const marker = document.getElementById(location);
  if (!marker) {
    alert("Invalid location selected.");
    return;
  }

  // Ensure the marker is visible
  marker.setAttribute("data-visible", "true");

  // Remove previous event text if it exists (to avoid stacking multiple events at the same marker)
  const existingEventText = marker.querySelector(".event-text");
  if (existingEventText) {
    existingEventText.remove();
  }

  // Create new event text
  const eventText = document.createElement("div");
  eventText.classList.add("event-text");
  eventText.textContent = `${eventName} - ${eventTime}`;
  eventText.style.position = "absolute";
  eventText.style.top = "25px"; // Places the event text below the marker
  eventText.style.left = "50%";
  eventText.style.transform = "translateX(-50%)";
  eventText.style.backgroundColor = "white";
  eventText.style.padding = "5px";
  eventText.style.fontSize = "14px";
  eventText.style.border = "1px solid navy";
  eventText.style.borderRadius = "5px";
  eventText.style.whiteSpace = "nowrap";
  eventText.style.zIndex = "10";

  // Append event text to the marker
  marker.appendChild(eventText);
});

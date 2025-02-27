
/* script.js */
document.getElementById("add-event-button").addEventListener("click", function() {
  const location = document.getElementById("event-location").value;
  const eventName = document.getElementById("event-name").value;
  const eventHour = document.getElementById("event-hour").value.padStart(2, '0');
  const eventMinute = document.getElementById("event-minute").value.padStart(2, '0');
  const eventPeriod = document.getElementById("event-period").value;
  if (eventName.trim() === "" || eventHour === "" || eventMinute === "") {
    alert("Please enter all event details.");
    return;
  }
  const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;
  const marker = document.getElementById(location);
  const eventText = document.createElement("div");
  eventText.textContent = `${eventName} - ${eventTime}`;
  eventText.style.position = "absolute";
  eventText.style.top = "-25px";
  eventText.style.left = "50%";
  eventText.style.transform = "translateX(-50%)";
  eventText.style.backgroundColor = "white";
  eventText.style.padding = "5px";
  eventText.style.fontSize = "12px";
  eventText.style.border = "1px solid navy";
  eventText.style.borderRadius = "5px";
  marker.appendChild(eventText);
});
document.getElementById("add-event-button").addEventListener("click", function() {
  const location = document.getElementById("event-location").value;
  const eventName = document.getElementById("event-name").value.trim();
  let eventHour = document.getElementById("event-hour").value;
  let eventMinute = document.getElementById("event-minute").value;
  const eventPeriod = document.getElementById("event-period").value;
  
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

  // Remove previous event text if exists
  const existingEventText = marker.querySelector(".event-text");
  if (existingEventText) {
    existingEventText.remove();
  }

  // Create event text
  const eventText = document.createElement("div");
  eventText.classList.add("event-text");
  eventText.textContent = `${eventName} - ${eventTime}`;
  eventText.style.position = "absolute";
  eventText.style.top = "-30px";
  eventText.style.left = "50%";
  eventText.style.transform = "translateX(-50%)";
  eventText.style.backgroundColor = "white";
  eventText.style.padding = "5px";
  eventText.style.fontSize = "12px";
  eventText.style.border = "1px solid navy";
  eventText.style.borderRadius = "5px";
  eventText.style.whiteSpace = "nowrap";

  // Append event text to the marker
  marker.appendChild(eventText);
});

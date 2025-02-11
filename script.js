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
  if (!marker) {
    alert("Invalid location selected.");
    return;
  }

  // Create event text and position it relative to the marker
  const eventText = document.createElement("div");
  eventText.textContent = `${eventName} - ${eventTime}`;
  eventText.style.position = "absolute";
  eventText.style.top = "-30px"; // Adjust this as needed
  eventText.style.left = "50%";
  eventText.style.transform = "translateX(-50%)";
  eventText.style.backgroundColor = "white";
  eventText.style.padding = "5px";
  eventText.style.fontSize = "12px";
  eventText.style.border = "1px solid navy";
  eventText.style.borderRadius = "5px";

  // Append the event text to the marker
  marker.appendChild(eventText);
});

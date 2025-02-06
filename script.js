import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9mqnZhBnaq9WUgGyXXU2qDpsZ3ApagXs",
    authDomain: "bosconow2.firebaseapp.com",
    projectId: "bosconow2",
    storageBucket: "bosconow2.firebasestorage.app",
    messagingSenderId: "1057613433966",
    appId: "1:1057613433966:web:8522231b75aa6588b32a7f",
    measurementId: "G-D6Y7HYH8BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const eventLocationSelect = document.getElementById("event-location");
const addEventButton = document.getElementById("add-event-button");
const eventsContainer = document.getElementById("events");

// Predefined locations (update coordinates as needed)
const locations = {
    "marker-1": { x: 34, y: 26 },
    "marker-2": { x: 57, y: 51 },
    "marker-3": { x: 80, y: 23 },
    "marker-4": { x: 57, y: 45 },
    "marker-5": { x: 80, y: 80 },
    "marker-6": { x: 34, y: 67 },
    "marker-7": { x: 54, y: 67 }
};

// Function to display events under markers
function renderEvents(events) {
    eventsContainer.innerHTML = ""; // Clear previous markers

    events.forEach(event => {
        const marker = document.getElementById(event.location);
        if (marker) {
            const eventText = document.createElement("div");
            eventText.className = "event-text";
            eventText.textContent = `${event.name} @ ${event.time}`;
            marker.appendChild(eventText); // Append event text under the marker
        }
    });
}

// Add new event to Firestore
addEventButton.addEventListener("click", async () => {
    const location = eventLocationSelect.value;
    const eventName = document.getElementById("event-name").value;
    const eventHour = document.getElementById("event-hour").value;
    const eventMinute = document.getElementById("event-minute").value;
    const eventPeriod = document.getElementById("event-period").value;

    if (!eventName || !eventHour || !eventMinute) {
        alert("Please fill out all event details!");
        return;
    }

    const time = `${eventHour}:${eventMinute} ${eventPeriod}`;

    try {
        await addDoc(collection(db, "events"), {
            location,
            name: eventName,
            time
        });
    } catch (error) {
        console.error("Error adding event:", error);
    }
});

// Listen for event updates in Firestore (Real-time updates)
onSnapshot(collection(db, "events"), (snapshot) => {
    const events = snapshot.docs.map(doc => doc.data());
    renderEvents(events);
});

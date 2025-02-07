import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
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

// Function to update marker positions
function updateMarker(id, left, top) {
    const marker = document.getElementById(id);
    if (marker) {
        marker.style.left = `${left}%`;
        marker.style.top = `${top}%`;
    }
}

// Set marker positions
updateMarker("marker-1", 34, 26);
updateMarker("marker-2", 57, 51);
updateMarker("marker-3", 80, 23);
updateMarker("marker-4", 57, 45);
updateMarker("marker-5", 80, 80);
updateMarker("marker-6", 34, 67);
updateMarker("marker-7", 54, 67);
updateMarker("marker-8", 34, 50);
updateMarker("marker-9", 45, 76);
updateMarker("marker-10", 34, 76);
updateMarker("marker-11", 12, 65);

// Add event
const addEventButton = document.getElementById("add-event-button");
if (addEventButton) {
    addEventButton.addEventListener("click", async () => {
        const location = document.getElementById("event-location").value;
        const eventName = document.getElementById("event-name").value;
        const eventHour = document.getElementById("event-hour").value;
        const eventMinute = document.getElementById("event-minute").value;
        const eventPeriod = document.getElementById("event-period").value;
        
        if (!eventName || !eventHour || !eventMinute) {
            alert("Please enter a valid event name and time.");
            return;
        }

        const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;
        await addDoc(collection(db, "events"), { location, name: eventName, time: eventTime });
    });
}

// Display events
onSnapshot(collection(db, "events"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const { location, name, time } = change.doc.data();
            const marker = document.getElementById(location);
            if (marker) {
                const eventList = document.createElement("div");
                eventList.classList.add("event-list");
                eventList.innerHTML = `<p>${name} - ${time}</p>`;
                marker.appendChild(eventList);
            }
        }
    });
});

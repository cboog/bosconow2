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

// Function to add event to Firestore
document.getElementById("add-event-button").addEventListener("click", async () => {
    const location = document.getElementById("event-location").value;
    const eventName = document.getElementById("event-name").value;
    const eventHour = document.getElementById("event-hour").value;
    const eventMinute = document.getElementById("event-minute").value;
    const eventPeriod = document.getElementById("event-period").value;

    if (!eventName || !eventHour || !eventMinute) {
        alert("Please fill out all event details!");
        return;
    }

    const eventTime = `${eventHour}:${eventMinute} ${eventPeriod}`;

    await addDoc(collection(db, "events"), { location, name: eventName, time: eventTime });
});

// Real-time event listener
onSnapshot(collection(db, "events"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const { location, name, time } = change.doc.data();
            const marker = document.getElementById(location);
            if (marker) {
                const eventList = marker.querySelector(".event-list");
                const eventItem = document.createElement("p");
                eventItem.textContent = `${name} - ${time}`;
                eventList.appendChild(eventItem);
            }
        }
    });
});

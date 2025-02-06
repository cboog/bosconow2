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

// Add event
document.getElementById("add-event-button").addEventListener("click", async () => {
    const location = document.getElementById("event-location").value;
    const eventName = document.getElementById("event-name").value;
    const eventTime = `${document.getElementById("event-hour").value}:${document.getElementById("event-minute").value} ${document.getElementById("event-period").value}`;

    await addDoc(collection(db, "events"), { location, name: eventName, time: eventTime });
});

// Display events
onSnapshot(collection(db, "events"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
            const { location, name, time } = change.doc.data();
            const marker = document.getElementById(location);
            if (marker) {
                marker.innerHTML += `<div class="event-list"><p>${name} - ${time}</p></div>`;
            }
        }
    });
});

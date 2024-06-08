importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.4.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDxZiowRmEKy48jbLzRjUPcibF9sSkzBxA",
    authDomain: "refillsmart-59b9d.firebaseapp.com",
    projectId: "refillsmart-59b9d",
    storageBucket: "refillsmart-59b9d.appspot.com",
    messagingSenderId: "385094691529",
    appId: "1:385094691529:web:7a83116616c16fabf47b18",
    measurementId: "G-5919513J9P"
  };
  
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
const notificationTitle = 'Background Message Title';
const notificationOptions = {
body: 'Background Message body.',
icon: '/logo.png'
};

self.registration.showNotification(notificationTitle, notificationOptions);
});
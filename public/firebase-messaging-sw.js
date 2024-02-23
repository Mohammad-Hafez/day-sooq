importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  
    apiKey: "AIzaSyAaFOpfMqgKFL8O2Di6dJB2ATXFcQKpWzU",
    authDomain: "day-sooq-notifications.firebaseapp.com",
    projectId: "day-sooq-notifications",
    storageBucket: "day-sooq-notifications.appspot.com",
    messagingSenderId: "678430887753",
    appId: "1:678430887753:web:dea613c5a6ca2b83a8d498",
    measurementId: "G-MCFVD47800"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
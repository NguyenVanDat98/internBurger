importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyD4NW466CndhoFxG7jwueZMpzYXOYjDNIw",
  authDomain: "internburger-6dd37.firebaseapp.com",
  databaseURL:
    "https://internburger-6dd37-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "internburger-6dd37",
  storageBucket: "internburger-6dd37.appspot.com",
  messagingSenderId: "650154867699",
  appId: "1:650154867699:web:a93124bfc9cd9e42127086",
  measurementId: "G-ZKVG7P74P6",
};
firebase.initializeApp(firebaseConfig);

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage(({ notification: { title, body, image } }) => {
    console.log("title :", title);
    console.log("body :", body);
    self.registration.showNotification(title, {
      body,
      icon: image || "/assets/icons/icon-72x72.png",
    });
  });
}

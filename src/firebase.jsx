import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from "firebase/messaging";

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console. 
const firebaseConfig = {
  apiKey: "AIzaSyDeiK-NSUwOsq8g9Vd7brty7_VgoV5VUiw",
  authDomain: "hsep-notification.firebaseapp.com",
  projectId: "hsep-notification",
  storageBucket: "hsep-notification.appspot.com",
  messagingSenderId: "254222419009",
  appId: "1:254222419009:web:a20ad8fa99b8e1369ef2c0",
  measurementId: "G-W0HC7GX5H9"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();


export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BKgvg0zkMQte8QiBn3ht37YSLiYIFZUV7OkRlXYfC4pSFNx1ST3fY8YrQN0pC2YKXp7v5FSikbw8PXNzYM3LiI0' });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      // Perform any other neccessary action with the token
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
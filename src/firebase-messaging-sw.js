import { initializeApp } from "firebase/app";
import { getToken ,getMessaging, onMessage} from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyD4NW466CndhoFxG7jwueZMpzYXOYjDNIw",
    authDomain: "internburger-6dd37.firebaseapp.com",
    databaseURL: "https://internburger-6dd37-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "internburger-6dd37",
    storageBucket: "internburger-6dd37.appspot.com",
    messagingSenderId: "650154867699",
    appId: "1:650154867699:web:a93124bfc9cd9e42127086",
    measurementId: "G-ZKVG7P74P6"
};

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        const app = initializeApp(firebaseConfig)
        const messaging = getMessaging(app)         
        
        ///////////////////////
        getToken(messaging,{vapidKey:"BHR4CPN9LWVSOMBGoDMuiOV3owOqs0DxRZfrUNP6lNudkksYuwjVejPsadnfZ-LWvhYiMUMtkJ-5JWTCppeJ6Xk"}).then((currentToken) => {
            if (currentToken) {
          //  console.log("token", currentToken)
           
            } else {
              console.log('No registration token available. Request permission to generate one.');
            }
          }).catch(err=>{
            console.log(err)
          })
          ////////////////////
          const onMessageListener = () =>
            onMessage(messaging, (payload) => {
              console.log("payload", payload)    
            });
          onMessageListener()

      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }
  requestPermission()

 
 
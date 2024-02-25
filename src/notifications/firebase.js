// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging , getToken} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA6lOOfl5vPe29nOEdHXHuNB-QPeUsP6-Y",
  authDomain: "daysouq-301d1.firebaseapp.com",
  projectId: "daysouq-301d1",
  storageBucket: "daysouq-301d1.appspot.com",
  messagingSenderId: "303515155721",
  appId: "1:303515155721:web:feeab1bced2027fd5727d8",
  measurementId: "G-DV0NCB7TBB"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken =  async () =>{
  const permission = await Notification.requestPermission();
  console.log(permission);
    let token = await getToken(messaging , 
      {
        vapidKey :
          "BBeeiUUAW0qLX0as9HFSHytxAsgYnSacbWV3N_XYKGQvnetCQNbVVJN6g0M8weZcZg7_SET1rXNmr3EukXpo-6I"
      });
      saveFCM(token)
}
const saveFCM = (token) => localStorage.setItem("FCM-Token" , token)

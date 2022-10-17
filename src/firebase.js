import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore ,collection , doc , setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAOV7GQgEw9qDWq3yfTJwB-oZPM0CBCVUs",
  authDomain: "chat-app-71de6.firebaseapp.com",
  projectId: "chat-app-71de6",
  storageBucket: "chat-app-71de6.appspot.com",
  messagingSenderId: "1060602745193",
  appId: "1:1060602745193:web:7b2f6dace41c549cad2df8",
  measurementId: "G-YDRBQTDWVD"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app)

export const insert_message = (data) => {
  try
  {
      
      let date = Date.now()
      setDoc(doc(db, "message", date.toString()), data)    
      document.querySelector('.input').value = ''        
  }
  catch(err)
  {   
      alert(err)
      console.log(err)
  }
}

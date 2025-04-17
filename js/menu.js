import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import menuData from "./menu.json" assert { type: "json" };

const firebaseConfig = {
  apiKey: "AIzaSyA5NhPnsfXEUbXYzkdB5kvfaE0swtViJaI",
  authDomain: "coffee-and-cake-e2f5d.firebaseapp.com",
  projectId: "coffee-and-cake-e2f5d",
  storageBucket: "coffee-and-cake-e2f5d.firebasestorage.app",
  messagingSenderId: "453243002159",
  appId: "1:453243002159:web:074baa5652ed789ecbd5da",
  measurementId: "G-1H7DM8MQCV"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function uploadMenuData() {
  try {
    const categories = ["drinks", "cakes", "toppings"];
    for (const category of categories) {
      const items = menuData.products[category];
      await set(ref(db, `products/${category}`), items);
      console.log(`Uploaded ${category} to Realtime Database`);
    }
    console.log("All data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
}

uploadMenuData();
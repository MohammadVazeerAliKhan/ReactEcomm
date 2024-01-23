// firestoreService.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/db.config.js";

const fetchDataFromFirestore = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    // Extract the data from the documents
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    // throw error; // Propagate the error if needed
  }
};

export default fetchDataFromFirestore;

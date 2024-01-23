import React from "react";
import { db } from "./config/db.config.js"; // Adjust the path accordingly
import { products } from "./data.js";

import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const AddDocumentButton = () => {
  console.log(db);
  const handleAddDocument = async () => {
    try {
      await Promise.all(
        products.map(async (product) => {
          // await db.collection("products").add(product);

          // // Add a new document with a generated id
          // const newProduct = doc(collection(db, "products"));
          // console.log(newProduct);

          // // later...
          // await setDoc({ id: newProduct._key.id, ...product });

          const newDoc = await addDoc(collection(db, "products"), product);
          console.log(newDoc);
        })
      );

      console.log("All documents added successfully!");
    } catch (error) {
      console.error("Error adding documents: ", error);
    }
  };

  return (
    <>
      <button onClick={handleAddDocument}>Add Document to Firestore</button>
      {/* <button onClick={handleGetData}>GetData</button> */}
    </>
  );
};

export default AddDocumentButton;

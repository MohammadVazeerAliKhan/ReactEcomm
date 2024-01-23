import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/Slices/productSlice";
import { db } from "../config/db.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
const AddProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);

  const handleAddButton = async () => {
    let newProduct = {
      name: name,
      description: description,
      rating: rating,
      price: price,
    };
    try {
      const productDocRef = await addDoc(
        collection(db, "products"),
        newProduct
      );

      dispatch(
        addProduct({
          ...newProduct,
          id: productDocRef.id,
        })
      );

      toast.success("Product Added Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add product.");
      console.error("Error adding product: ", error);
    }
  };
  const handleDiscardButton = () => {
    setName("");
    setDescription("");
    setRating(0);
    setPrice(0);
    navigate("/");
  };

  return (
    <div>
      <div className="productCardDetails">
        <form className="productForm addProduct">
          <div className="productImage">
            <img src="/Assets/Images/product.jpg" alt="product" disabled />
          </div>
          <div className="first">
            <div className="namePriceContainer">
              <span>Name </span>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
              />
              <div className="price">
                <span>Rs </span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Enter price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="ratingContainer">
              <span>Rating</span>
              <input
                type="number"
                name="rating"
                id="rating"
                placeholder="Set product rating"
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
          </div>
          <div className="second">
            <span>Description</span>
            <textarea
              name="description"
              placeholder="Add product description here"
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="productDescription"
            ></textarea>
            <div className="optionsContainer">
              <div className="buttonsContainer">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDiscardButton();
                  }}
                  className="btnicon option"
                >
                  Discard
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddButton();
                  }}
                  className="btnicon option"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductScreen;

import React, { useState } from "react";
import { editProduct } from "../redux/Slices/productSlice";
import { addItemToCart, deleteItemFromCart } from "../redux/Slices/cartSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { db } from "../config/db.config";
import { doc, updateDoc } from "@firebase/firestore";
import RatingStars from "../Components/Rating";
import { toast } from "react-toastify";
const ProductDetailsScreen = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cartItems);
  const product = products.find((p) => p.id === id);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [price, setPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleCartClick = (id) => {
    let addItem = products.find((prod) => prod.id === id);
    dispatch(addItemToCart(addItem));
    toast.success("Product added to Cart");
  };
  const handleEditClick = (id) => {
    setIsDisabled(false);
    setIsEditing(true);
  };
  const handleSaveButton = async () => {
    let index = products.findIndex((prod) => prod.id === product.id);
    let editedProduct = {
      name: name,
      description: description,
      rating: rating,
      price: price,
      id: product.id,
    };
    try {
      const productDocRef = doc(db, "products", product.id);

      // Update the document in Firestore
      await updateDoc(productDocRef, editedProduct);
      toast.success("Product Updated Successfully");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
    dispatch(editProduct({ index: index, product: editedProduct }));
    setIsDisabled(true);
    setIsEditing(false);
  };
  const handleCancelButton = () => {
    setIsDisabled(true);
    setIsEditing(false);
    toast.error("Discard successful");
  };
  return (
    <div className="productCardDetails">
      <form className="productFormDetail">
        <div className="productImage">
          <img
            src={product.imageUrl || `/Assets/Images/product.jpg`}
            alt="product"
          />
        </div>
        <div className="first">
          <div className="namePriceContainer">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
              onChange={(e) => setName(e.target.value)}
              disabled={isDisabled}
            />
            <div className="price">
              <span>Rs </span>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={product.price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={isDisabled}
              />
            </div>
          </div>
          <div className="ratingContainer">
            {isEditing ? (
              <input
                type="number"
                name="rating"
                id="rating"
                defaultValue={product.rating}
                onChange={(e) => setRating(e.target.value)}
              />
            ) : (
              <RatingStars rating={product.rating} />
            )}
          </div>
        </div>
        <div className="second">
          <textarea
            name="description"
            defaultValue={product.description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="productDescription"
            disabled={isDisabled}
          ></textarea>
          <div className="optionsContainer">
            {isEditing ? (
              <div className="buttonsContainer">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCancelButton();
                  }}
                  className="btnicon option"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSaveButton();
                  }}
                  className="btnicon option"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="iconsContainer">
                <img
                  src="/Assets/Images/editIcon.png"
                  alt="editIcon"
                  width="20px"
                  height="20px"
                  onClick={() => handleEditClick(product.id)}
                  className="btnicon"
                />
                {/* <img
                  src="/Assets/Images/deleteIcon.png"
                  alt="deleteIcon"
                  width="20px"
                  height="20px"
                  onClick={() => handleDeleteClick(product.id)}
                  className="btnicon"
                /> */}
                <FaShoppingCart
                  aria-label="Shopping Cart"
                  onClick={() => handleCartClick(product.id)}
                  className="btnicon"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetailsScreen;

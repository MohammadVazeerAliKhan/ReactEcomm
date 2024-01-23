import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct } from "../redux/Slices/productSlice";
import { db } from "../config/db.config";
import { doc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RatingStars from "./Rating";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [rating, setRating] = useState(product.rating);
  const [price, setPrice] = useState(product.price);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleDeleteClick = async (id) => {
    try {
      toast.success("Product deleted!");
      dispatch(deleteProduct(id));
    } catch (error) {
      toast.error("Error deleting product");
      console.error("Error deleting product: ", error);
    }
  };
  const handleEditClick = () => {
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
      toast.error("Cannot update product");
    }
    dispatch(editProduct({ index: index, product: editedProduct }));
    setIsDisabled(true);
    setIsEditing(false);
  };
  const handleCancelButton = () => {
    toast.error("Discard successful.");
    setIsDisabled(true);
    setIsEditing(false);
  };
  return (
    <div className="productCardDetails">
      <form className="productForm">
        <div className="productImage">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.imageUrl || `/Assets/Images/product.jpg`}
              alt="product"
            />
          </Link>
        </div>
        <div className="first">
          <div className="namePriceContainer">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isDisabled}
              required
            />
            <div className="price">
              <span>Rs </span>
              <input
                type="number"
                name="price"
                id="price"
                defaultValue={price}
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
                defaultValue={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            ) : (
              <RatingStars rating={rating} />
            )}
          </div>
        </div>
        <div className="second">
          <textarea
            name="description"
            placeholder="Enter Product Description here"
            defaultValue={product.description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            className="productDescription"
            disabled={isDisabled}
            required
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
                <img
                  src="/Assets/Images/deleteIcon.png"
                  alt="deleteIcon"
                  width="20px"
                  height="20px"
                  onClick={() => handleDeleteClick(product.id)}
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

export default Product;

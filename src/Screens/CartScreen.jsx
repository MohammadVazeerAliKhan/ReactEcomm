import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemFromCart } from "../redux/Slices/cartSlice";
import RatingStars from "../Components/Rating";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const removeItemHandler = (id) => {
    let index = cartItems.findIndex((prod) => prod.id === id);

    dispatch(deleteItemFromCart(index));
  };

  const calculatePrices = (items) => {
    return items.reduce(
      (total, item) => parseFloat(total) + parseFloat(item.price),
      0
    );
  };

  const cartValue = parseFloat(calculatePrices(cartItems));
  const taxPrice = parseFloat(0.05 * cartValue);
  const totalValue = parseFloat(cartValue + taxPrice);

  // console.log(cartItems);
  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="cartScreenFlex">
          <div className="cartScreenProducts">
            {cartItems.map((product, index) => {
              return (
                <>
                  <div className="productCardDetails" key={index}>
                    <form className="productForm">
                      <div className="productImage">
                        <Link to={`/product/${product.id}`}>
                          <img src="/Assets/Images/product.jpg" alt="product" />
                        </Link>
                      </div>
                      <div className="first">
                        <div className="namePriceContainer">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={product.name}
                            disabled
                          />
                          <div className="price">
                            <span>Rs </span>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={product.price}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="ratingContainer">
                          <RatingStars rating={product.rating} />
                        </div>
                      </div>
                      <div className="second">
                        <textarea
                          name="description"
                          value={product.description}
                          id="description"
                          className="productDescription"
                          disabled
                        ></textarea>
                        <div className="optionsContainer">
                          <div className="buttonsContainer">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                removeItemHandler(product.id);
                              }}
                              className="btnicon option"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              );
            })}
          </div>
          <div className="cartCheckOutDetails">
            <h3>Subtotal({`${cartItems.length}`} Items)</h3>
            <div className="cartDataHeader">
              <h3>S.No</h3>
              <h3>Item</h3>
              <h3>Price</h3>
            </div>
            {cartItems.map((item, index) => {
              return (
                <div className="cartDataHeader">
                  <span>{index + 1}. </span>
                  <span>{item.name} </span>
                  <span> {item.price} INR</span>
                </div>
              );
            })}
            <div className="cartDataHeader">
              <h3>Cart Value: </h3>
              <span>{parseFloat(cartValue).toFixed(2)} INR</span>
            </div>

            <div className="cartDataHeader">
              <h3>Tax: </h3>
              <span>{parseFloat(taxPrice).toFixed(2)} INR</span>
            </div>

            <div className="cartDataHeader">
              <h3>Total Price: </h3>
              <span>{parseFloat(totalValue).toFixed(2)} INR</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          Click <Link to="/">here</Link> to add products to the cart
        </div>
      )}
    </div>
  );
};

export default CartScreen;

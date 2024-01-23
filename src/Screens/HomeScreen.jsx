import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "../Components/Product";
import { sortProducts, unsortProducts } from "../redux/Slices/productSlice";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsData = useSelector((state) => state.products.products);
  const [products, setProducts] = useState(productsData);
  const [isLoading, setIsLoading] = useState(true);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setProducts(productsData);
  }, [productsData]);

  const handleSort = (e) => {
    e.preventDefault();
    setSorted(true);
    dispatch(sortProducts());
  };
  const handleClearFilter = async (e) => {
    e.preventDefault();
    setSorted(false);
    setProducts(productsData); // Reset to the original data
    dispatch(unsortProducts());
    navigate("/");
  };

  return (
    <div className="homescreen">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sorted ? (
            <button onClick={handleClearFilter}>Remove Filters</button>
          ) : (
            <button onClick={handleSort}>Sort by: Price</button>
          )}

          {products?.map((prod) => (
            <Product key={prod.id} product={prod} />
          ))}
        </>
      )}
    </div>
  );
};

export default HomeScreen;

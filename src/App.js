import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import HomeScreen from "./Screens/HomeScreen";
import CartScreen from "./Screens/CartScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchDataFromFirestore from "./FetchFirestoreData";
import { useDispatch } from "react-redux";
import { setProduct } from "./redux/Slices/productSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailsScreen from "./Screens/ProductDetailsScreen";
import AddProductScreen from "./Screens/AddProductScreen";
const Loading = () => {
  return <>Loading...</>;
};

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromFirestore("products");
        // console.log(response);
        dispatch(setProduct(response));
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false even in case of an error
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            {/* Child routes go inside Outlet */}
            {loading ? (
              <Route index element={<Loading />} />
            ) : (
              <>
                <Route index element={<HomeScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/product/:id" element={<ProductDetailsScreen />} />
                <Route path="/create" element={<AddProductScreen />} />
              </>
            )}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;

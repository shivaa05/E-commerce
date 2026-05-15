import React, { useEffect } from "react";
import Signup from "./pages/User/Signup";
import Signin from "./pages/User/Signin";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/User/Home";
import { Toaster } from "react-hot-toast";
import Protected from "./components/Protected";
import { useAuthStore } from "./store/AuthStore";
import { useProductStore } from "./store/ProductStore";
import { useUserStore } from "./store/UserStore";
import Cart from "./pages/User/Cart";
import Wishlist from "./pages/User/Wishlist";
import Profile from "./pages/User/Profile";
import MyOrders from "./pages/User/MyOrders";
import AdminHome from "./pages/Admin/AdminHome";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminSettings from "./pages/Admin/AdminSettings";

const App = () => {
  const { user, fetchLoggedInUser } = useAuthStore();
  const { fetchAllProducts } = useProductStore();
  const { getCartItems } = useUserStore();
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    fetchAllProducts();
    getCartItems();
  }, [user]);
  return (
    <div className="w-full">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <Signin />}
        />

        {/* Protected Routes */}
        <Route path="/" element={<Protected />}>
          <Route
            index
            element={user?.role === "User" ? <Home /> : <AdminHome />}
          />
          <Route path="/cart" element={user?.role === "User" && <Cart />} />
          <Route
            path="/wishlist"
            element={user?.role === "User" && <Wishlist />}
          />
          <Route
            path="/profile"
            element={user?.role === "User" && <Profile />}
          />
          <Route
            path="/my-orders"
            element={user?.role === "User" && <MyOrders />}
          />
          <Route
            path="/admin/products"
            element={user?.role === "Admin" && <AdminProducts />}
          />
          <Route
            path="/admin/orders"
            element={user?.role === "Admin" && <AdminOrders />}
          />
          <Route
            path="/admin/customers"
            element={user?.role === "Admin" && <AdminCustomers />}
          />
          <Route
            path="/admin/settings"
            element={user?.role === "Admin" && <AdminSettings />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

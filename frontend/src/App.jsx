import React, { useEffect } from 'react'
import Signup from './pages/User/Signup'
import Signin from './pages/User/Signin'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/User/Home'
import { Toaster } from 'react-hot-toast'
import Protected from './components/Protected'
import { useAuthStore } from './store/AuthStore'
import { useProductStore } from './store/ProductStore'
const App = () => {
  const { user, fetchLoggedInUser } = useAuthStore();
  const {fetchAllProducts} = useProductStore();
  useEffect(() => {
    fetchLoggedInUser();
  },[])

  useEffect(() => {
    fetchAllProducts();
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
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
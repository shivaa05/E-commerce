import React, { useEffect } from "react";
import Navbar from "../../components/User/Navbar";
import HeroSection from "../../components/User/HeroSection";
import SingleProduct from "../../components/User/SingleProduct";
import { useProductStore } from "../../store/ProductStore";
import { useUserStore } from "../../store/UserStore";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const Home = () => {
  const { products } = useProductStore();
  const { clearCart } = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      clearCart();
      toast.success("Payment Successful! Order placed.", {
        id: "payment-success",
      });
      // Remove query param to clean URL
      setSearchParams({});
    }
  }, [searchParams, clearCart, setSearchParams]);

  return (
    <div className="w-full h-full">
      <Navbar />
      <HeroSection />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:px-24 md:gap-4">
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

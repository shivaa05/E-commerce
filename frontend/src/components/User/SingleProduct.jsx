import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { Handbag, ShoppingCart } from "lucide-react"
import { useUserStore } from "../../store/UserStore";
import { useNavigate } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);
  const images = product.images;
  const [currImage, setCurrImage] = useState(0);
  const { cart, addToCart } = useUserStore();

  const isPresentInCart = () => {
    return cart.some((item) => item.product._id === product._id);
  };
  const navigate = useNavigate();
  return (
    <div className="pb-2 border-r border-zinc-300 relative">
      {wishlist ? (
        <FaHeart
          className="absolute top-2 right-2 size-5 cursor-pointer text-rose-600"
          onClick={() => setWishlist(!wishlist)}
        />
      ) : (
        <FaRegHeart
          className="absolute top-2 right-2 size-5 cursor-pointer text-rose-600"
          onClick={() => setWishlist(!wishlist)}
        />
      )}

      {images.length > 1 && (
        <div className="absolute bottom-36 md:top-2 left-2 flex gap-1 md:flex-col justify-center w-full md:justify-start">
          {images.map((image, ind) => (
            <img
              src={image}
              alt=""
              key={ind}
              className={`size-10 rounded-md ${ind == currImage && "border border-rose-500"} cursor-pointer`}
              onClick={() => setCurrImage(ind)}
            />
          ))}
        </div>
      )}
      <img
        src={images[currImage]}
        alt=""
        className="h-72 md:h-96 w-full object-cover"
      />
      <div className="p-2 ">
        {/* Product name */}
        <div className="font-[font1] ">{product.name}</div>

        {/* description */}
        <div className="text-xs line-clamp-2 text-zinc-500">
          {product.description}
        </div>

        {/* Pricing */}
        <div className="flex gap-1.5 text-sm items-baseline">
          <span>₹ {product.price}</span>
          <span className="text-zinc-500 text-xs tracking-tight line-through">
            ₹4299
          </span>
          <span className="text-orange-400 text-xs">(₹77% OFF)</span>
        </div>

        <div className="flex flex-col lg:flex-row justify-between p-2 gap-2">
          <div className="flex gap-1 items-center mt-1 bg-green-300/50 w-fit px-4 py-1 rounded-full text-sm">
            <span>4.3</span>
            <FaStar className="size-3.5 text-green-700/90" />
            <span>| 5</span>
          </div>
          <div className="flex gap-1 items-center mt-1 px-4 cursor-pointer border rounded-lg text-lg lg:text-sm  justify-center py-1.5 bg-[#FF3E6C] text-[#FFDCC3] font-semibold">
            {isPresentInCart() ? (
              <div
                className="flex gap-2 items-center"
                onClick={() => navigate("/cart")}
              >
                <Handbag className="size-3.5" />
                <div>Go to Bag</div>
              </div>
            ) : (
              <div
                className="flex gap-2 items-center"
                onClick={() => addToCart(product._id)}
              >
                <Handbag className="size-3.5" />
                <div>Add to Bag</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

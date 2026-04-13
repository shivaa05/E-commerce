import React from "react";
import { useUserStore } from "../../store/UserStore";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, removeOneFromCart, clearCart, removeAllFromCart, addToCart } =
    useUserStore();
  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0,
    );
  };
  const totalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <div className="h-16 border-b flex items-center gap-2 px-4 text-lg font-semibold uppercase text-[#393b53]">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate("/")} />
        Shopping Bag
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <img src="./empty-bag.webp" alt="" className="w-52" />
          <div className="text-xl font-bold">Hey, it feels so light!</div>
          <p className="w-2/3 text-center font-medium text-gray-500">
            There is nothing in your bag. Let's add some items
          </p>
          <button
            className="bg-[#f24c75] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#e12067] transition-colors mt-5"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
          <div className="w-full md:max-w-2/3 flex flex-col mx-auto mt-6">
          {/* Address */}
          <div className="flex justify-between items-center p-4 font-semibold text-[#5a5b62]">
            <div className="w-2/3">
              <div>Deliver to: SHIVA VERMA, 225413</div>
              <div className="line-clamp-1">
                Amseruwa, Siddhaur Barabanki UttarPradesh 225413
              </div>
            </div>
            <div className="text-[#f24c75] cursor-pointer text-lg font-semibold">
              Change
            </div>
          </div>

          <div className="flex justify-between items-center px-4 py-4 bg-zinc-100">
            <div className="flex gap-2 tracking-wider text-sm font-semibold text-[#5a5b62]">
              {totalQuantity()} ITEMS SELECTED{" "}
              <span className="text-[#f24c75]">
                (₹{totalPrice().toLocaleString()})
              </span>
            </div>
            <div>
              <Trash2 className="text-[#e12067]" onClick={() => clearCart()} />
            </div>
          </div>

          <div>
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-4 border-b h-52"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-36 h-full object-cover rounded"
                />
                <div className="flex-1 ">
                  <div className="font-semibold text-[#393b53]">
                    {item.product.name}
                  </div>
                  <div className="text-[#57596c] line-clamp-2 text-sm">
                    {item.product.description}
                  </div>

                  <div className="gap-1 items-end mt-1 flex text-sm font-semibold">
                    PRICE:
                    <span className="text-[#f24c75]">
                      ₹ {item.product.price.toLocaleString()}
                    </span>
                    <span className="text-zinc-500 text-xs tracking-tight line-through">
                      ₹4299
                    </span>
                    <span className="text-orange-400 text-xs">(₹77% OFF)</span>
                  </div>

                  <div className="text-[#5a5b62] mt-2">
                    <div>Quantity: {item.quantity}</div>
                    <div className="flex gap-2 mt-3">
                      <div
                        className="border px-3 w-16 flex items-center justify-center rounded-full bg-[#131112] text-white py-1 text-sm"
                        onClick={() => removeOneFromCart(item.product._id)}
                      >
                        -1
                      </div>
                      <div
                        className="border px-3 w-16 flex items-center justify-center rounded-full bg-[#131112] text-white py-1 text-sm"
                        onClick={() => addToCart(item.product._id)}
                      >
                        +1
                      </div>
                      <div
                        className="border px-3 rounded-full bg-rose-500 text-white py-1"
                        onClick={() => removeAllFromCart(item.product._id)}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

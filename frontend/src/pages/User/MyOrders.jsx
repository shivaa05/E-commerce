import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/UserStore";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
  Receipt,
} from "lucide-react";

const MyOrders = () => {
  const { orders, getMyOrders } = useUserStore();
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    getMyOrders();
  }, [getMyOrders]);

  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16 min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Looks like you haven't placed any orders yet. Once you do, they will
            appear here.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
            >
              {/* Order Header */}
              <div
                className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
                onClick={() => toggleOrderDetails(order._id)}
              >
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    Order ID:{" "}
                    <span className="font-mono text-gray-700">{order._id}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Placed on:{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">
                      Total Amount
                    </div>
                    <div className="font-bold text-gray-900">
                      ₹{order.pricing?.totalPrice?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ₹{
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus === "Processing" ||
                              order.orderStatus === "Pending"
                            ? "bg-blue-100 text-blue-800"
                            : order.orderStatus === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.orderStatus || "Processing"}
                    </span>
                    {expandedOrderId === order._id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6 divide-y divide-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4 px-2">
                  Items in this order
                </h3>
                {order.orderItems?.map((item) => (
                  <div
                    key={item._id || item.product?._id}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50 flex items-center justify-center">
                      <img
                        src={
                          item.product?.images?.[0]?.url ||
                          item.product?.images?.[0] ||
                          "https://via.placeholder.com/150"
                        }
                        alt={item.product?.name || "Product"}
                        className="h-full w-full object-cover object-center"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2 pr-4">
                            {item.product?.name || "Unavailable Product"}
                          </h3>
                          <p className="ml-4 whitespace-nowrap">
                            ₹{(item.product?.price || 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm mt-1">
                        <p className="text-gray-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Collapsible Content */}
              {expandedOrderId === order._id && (
                <div className="bg-white">
                  {/* Order Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 border-b border-gray-100 bg-slate-50/30">
                    {/* Shipping Address */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <h3>Shipping Address</h3>
                      </div>
                      <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="font-medium text-gray-900 mb-1">
                          {order.fullname}
                        </p>
                        <p>{order.shippingInfo?.address}</p>
                        <p>
                          {order.shippingInfo?.city},{" "}
                          {order.shippingInfo?.state}{" "}
                          {order.shippingInfo?.postalCode}
                        </p>
                        <p>{order.shippingInfo?.country}</p>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <CreditCard className="w-4 h-4 text-indigo-500" />
                        <h3>Payment Details</h3>
                      </div>
                      <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-100 shadow-sm space-y-2">
                        <div className="flex justify-between">
                          <span>Payment Method:</span>
                          <span className="font-medium text-gray-900">
                            {order.paymentId?.paymentType || "Online"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Status:</span>
                          <span
                            className={`font-medium ₹{order.paymentId?.paymentStatus === "Paid" ? "text-green-600" : "text-yellow-600"}`}
                          >
                            {order.paymentId?.paymentStatus || "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="space-y-3 md:col-span-2">
                      <div className="flex items-center gap-2 text-gray-800 font-semibold">
                        <Receipt className="w-4 h-4 text-indigo-500" />
                        <h3>Order Summary</h3>
                      </div>
                      <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-100 shadow-sm md:w-1/2">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>
                              ₹{order.pricing?.itemsPrice?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>
                              ₹{order.pricing?.taxPrice?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Coupon Discount:</span>
                            <span>
                              ₹{order.pricing?.couponDiscount?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Product Discount:</span>
                            <span>
                              ₹{order.pricing?.productDiscount?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>
                              {order.pricing?.shippingPrice === 0
                                ? "Free"
                                : `₹₹{order.pricing?.shippingPrice?.toFixed(2)}`}
                            </span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900 text-base">
                            <span>Total:</span>
                            <span>
                              ₹{order.pricing?.totalPrice?.toFixed(2) || "0.00"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          className="bg-[#EC003F] hover:bg-[#f42656] cursor-pointer text-white font-bold py-2 px-6 rounded"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default MyOrders;

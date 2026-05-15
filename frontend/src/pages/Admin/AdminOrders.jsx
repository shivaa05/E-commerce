import React, { useState, useEffect } from "react";
import AdminNav from "../../components/Admin/AdminNav";
import { Search, Eye, Edit2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // For updating status
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/admin/get-all-orders`, {
        withCredentials: true,
      });
      setOrders(res.data.order || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId) => {
    if (!newStatus) return;
    try {
      await axios.put(
        `${BACKEND_URL}/api/admin/update-order-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true },
      );
      toast.success("Order status updated!");
      setEditingOrderId(null);
      setNewStatus("");
      fetchOrders(); // Refresh to show new status
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const orderIdMatch = order._id?.toLowerCase().includes(term);
    const nameMatch =
      order.fullname?.toLowerCase().includes(term) ||
      order.user?.name?.toLowerCase().includes(term);
    return orderIdMatch || nameMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-full z-10">
        <AdminNav />
      </div>

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Orders</h1>
            <p className="text-gray-500 mt-1">
              View and update customer orders.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by ID or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-sm text-gray-500">
              Total:{" "}
              <span className="font-semibold text-gray-900">
                {filteredOrders.length}
              </span>{" "}
              Orders
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer Info</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Total Amount</th>
                  <th className="p-4 font-medium">Payment Status</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-indigo-600">
                        {order._id}
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-gray-900">
                          {order.fullname || order.user?.name}
                        </p>
                      </td>
                      <td className="p-4 text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        ${order.pricing?.totalPrice?.toFixed(2) || "0.00"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.paymentId?.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.paymentId?.paymentStatus || "Unpaid"}
                        </span>
                      </td>
                      <td className="p-4">
                        {editingOrderId === order._id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={newStatus || order.orderStatus}
                              onChange={(e) => setNewStatus(e.target.value)}
                              className="border border-gray-300 rounded px-2 py-1 text-xs"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                            <button
                              onClick={() => handleUpdateStatus(order._id)}
                              className="bg-indigo-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingOrderId(null)}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.orderStatus,
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        )}
                      </td>
                      <td className="p-4 space-x-2 text-right">
                        {editingOrderId !== order._id && (
                          <button
                            onClick={() => {
                              setEditingOrderId(order._id);
                              setNewStatus(order.orderStatus);
                            }}
                            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors"
                            title="Edit Status"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

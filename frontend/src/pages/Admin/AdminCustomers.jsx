import React, { useState, useEffect } from "react";
import AdminNav from "../../components/Admin/AdminNav";
import {
  Search,
  Mail,
  Ban,
  Trash2,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Coupon assigning state
  const [assigningUserId, setAssigningUserId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  const fetchUsers = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BACKEND_URL}/api/admin/get-all-users?page=${pageNum}&limit=12`,
        {
          withCredentials: true,
        },
      );
      const fetchedUsers = res.data.users || [];
      setCustomers(fetchedUsers);
      setHasMore(fetchedUsers.length === 12);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleAssignCoupon = async (userId) => {
    if (!couponCode || !discountPercentage) {
      return toast.error("Please provide both code and discount %");
    }
    try {
      await axios.post(
        `${BACKEND_URL}/api/admin/assign-coupon/${userId}`,
        {
          couponCode,
          discountPercentage: Number(discountPercentage),
        },
        { withCredentials: true },
      );
      toast.success("Coupon assigned successfully!");
      setAssigningUserId(null);
      setCouponCode("");
      setDiscountPercentage("");
      fetchUsers();
    } catch (error) {
      console.error("Error assigning coupon:", error);
      toast.error(error.response?.data?.message || "Failed to assign coupon");
    }
  };

  const handleRemoveCoupon = async (userId, code) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/admin/remove-coupon/${userId}`,
        { couponCode: code },
        { withCredentials: true },
      );
      toast.success("Coupon removed successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error removing coupon:", error);
      toast.error(error.response?.data?.message || "Failed to remove coupon");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/delete-user/${userId}`, {
        withCredentials: true,
      });
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-full z-10">
        <AdminNav />
      </div>

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Customers
            </h1>
            <p className="text-gray-500 mt-1">View and manage store users.</p>
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
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="text-sm text-gray-500">
              Total:{" "}
              <span className="font-semibold text-gray-900">
                {filteredCustomers.length}
              </span>{" "}
              Customers
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">Customer Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Joined Date</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Total Spent</th>
                  <th className="p-4 font-medium">Coupons</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      Loading customers...
                    </td>
                  </tr>
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                        {customer.profilePicture && (
                          <img
                            src={customer.profilePicture}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        {customer.name}
                      </td>
                      <td className="p-4 text-gray-500">{customer.email}</td>
                      <td className="p-4 text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-gray-900">
                        {/* We would need to calculate this from existing orders if populated, or show role */}
                        {customer.role}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        {/* Total Spent mocked placeholder for now if not populated in backend */}
                        -
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          {customer.coupons && customer.coupons.length > 0 ? (
                            customer.coupons.map((c, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full flex items-center justify-between w-max gap-2"
                              >
                                {c.couponCode} ({c.discount}%)
                                <button
                                  onClick={() =>
                                    handleRemoveCoupon(
                                      customer._id,
                                      c.couponCode,
                                    )
                                  }
                                  className="text-red-500 hover:text-red-700 font-bold"
                                >
                                  ×
                                </button>
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs text-center w-full">
                              No coupons
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 space-x-2 text-right">
                        {assigningUserId === customer._id ? (
                          <div className="flex gap-2 items-center justify-end">
                            <input
                              type="text"
                              placeholder="Code"
                              className="border p-1 w-20 text-xs rounded"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <input
                              type="number"
                              placeholder="%"
                              className="border p-1 w-12 text-xs rounded"
                              value={discountPercentage}
                              onChange={(e) =>
                                setDiscountPercentage(e.target.value)
                              }
                            />
                            <button
                              onClick={() => handleAssignCoupon(customer._id)}
                              className="bg-indigo-600 text-white p-1 rounded text-xs"
                            >
                              Add
                            </button>
                            <button
                              onClick={() => setAssigningUserId(null)}
                              className="bg-gray-200 text-gray-700 p-1 rounded text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setAssigningUserId(customer._id)}
                              className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded transition-colors"
                              title="Assign Coupon"
                            >
                              <Tag size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(customer._id)}
                              className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="flex items-center text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {page}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasMore}
              className="flex items-center text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

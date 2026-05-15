import React from "react";
import AdminNav from "../../components/Admin/AdminNav";
import {
  Package,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const AdminHome = () => {
  // Dummy data for statistics
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: DollarSign,
      trend: "+20.1% from last month",
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: "+2350",
      icon: ShoppingBag,
      trend: "+180.1% from last month",
      color: "text-blue-500",
    },
    {
      title: "Total Products",
      value: "456",
      icon: Package,
      trend: "+19% from last month",
      color: "text-purple-500",
    },
    {
      title: "Total Users",
      value: "+12,234",
      icon: Users,
      trend: "+5% from last month",
      color: "text-orange-500",
    },
  ];

  // Dummy data for recent orders
  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      product: "Nike Air Max",
      date: "2026-05-15",
      status: "Delivered",
      amount: "$120.00",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      product: "Apple Watch Series 9",
      date: "2026-05-14",
      status: "Processing",
      amount: "$399.00",
    },
    {
      id: "#ORD-003",
      customer: "Michael Johnson",
      product: "Sony Headphones XL",
      date: "2026-05-13",
      status: "Shipped",
      amount: "$250.00",
    },
    {
      id: "#ORD-004",
      customer: "Emily Brown",
      product: "Samsung Galaxy S24",
      date: "2026-05-12",
      status: "Pending",
      amount: "$899.00",
    },
    {
      id: "#ORD-005",
      customer: "Chris Wilson",
      product: "Mechanical Keyboard",
      date: "2026-05-11",
      status: "Delivered",
      amount: "$145.00",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 fixed h-full">
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back, Admin! Here is what's happening with your store
              today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-green-500 font-medium mr-2">Up</span>
                <span className="text-gray-400 text-xs">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
              View All Orders
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Product</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-indigo-600">
                      {order.id}
                    </td>
                    <td className="p-4 text-gray-900">{order.customer}</td>
                    <td className="p-4 text-gray-500">{order.product}</td>
                    <td className="p-4 text-gray-500">{order.date}</td>
                    <td className="p-4 font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

import React, { useState } from "react";
import AdminNav from "../../components/Admin/AdminNav";
import { Search, Mail, Ban, Trash2 } from "lucide-react";

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for customers
  const [customers, setCustomers] = useState([
    {
      _id: "USR-001",
      name: "John Doe",
      email: "john@example.com",
      joined: "2025-01-10",
      totalOrders: 5,
      spent: 450.0,
      status: "Active",
    },
    {
      _id: "USR-002",
      name: "Jane Smith",
      email: "jane@example.com",
      joined: "2025-03-22",
      totalOrders: 2,
      spent: 120.0,
      status: "Active",
    },
    {
      _id: "USR-003",
      name: "Michael Johnson",
      email: "mike@example.com",
      joined: "2025-06-15",
      totalOrders: 8,
      spent: 1350.0,
      status: "Restricted",
    },
    {
      _id: "USR-004",
      name: "Emily Brown",
      email: "emily@example.com",
      joined: "2026-02-05",
      totalOrders: 1,
      spent: 899.0,
      status: "Active",
    },
    {
      _id: "USR-005",
      name: "Chris Wilson",
      email: "chris@example.com",
      joined: "2026-04-18",
      totalOrders: 0,
      spent: 0.0,
      status: "Active",
    },
  ]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
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
                  <th className="p-4 font-medium">Orders</th>
                  <th className="p-4 font-medium">Total Spent</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="p-4 text-gray-500">{customer.email}</td>
                      <td className="p-4 text-gray-500">{customer.joined}</td>
                      <td className="p-4 text-gray-900">
                        {customer.totalOrders}
                      </td>
                      <td className="p-4 font-medium text-gray-900">
                        ${customer.spent.toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4 space-x-2 text-right">
                        <button
                          className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded transition-colors"
                          title="Contact User"
                        >
                          <Mail size={16} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-orange-600 hover:bg-orange-50 p-2 rounded transition-colors"
                          title={
                            customer.status === "Active"
                              ? "Restrict User"
                              : "Unrestrict User"
                          }
                        >
                          <Ban size={16} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
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
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

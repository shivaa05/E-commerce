import React from "react";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

const AdminNav = () => {
  const { logout } = useAuthStore();

  const navLinks = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Customers", icon: Users, path: "/admin/customers" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="bg-white h-full border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-indigo-600 tracking-tight">
            AdminPanel
          </h2>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive && link.path === "/"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg transition-colors font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNav;

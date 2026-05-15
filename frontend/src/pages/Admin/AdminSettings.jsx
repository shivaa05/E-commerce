import React, { useState } from "react";
import AdminNav from "../../components/Admin/AdminNav";
import { Save } from "lucide-react";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "My E-Commerce Store",
    contactEmail: "support@mystore.com",
    currency: "USD",
    taxRate: "8.5",
    shippingFee: "10.00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreSettings({ ...storeSettings, [name]: value });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Here you would typically dispatch a store action or API call to save settings
    toast.success("Store settings updated successfully");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-full z-10">
        <AdminNav />
      </div>

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
          <p className="text-gray-500 mt-1">
            Manage global preferences for your e-commerce platform.
          </p>
        </div>

        <div className="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <form onSubmit={handleSaveSettings}>
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                General Configuration
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Store Name
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      value={storeSettings.storeName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={storeSettings.contactEmail}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={storeSettings.currency}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      name="taxRate"
                      step="0.01"
                      value={storeSettings.taxRate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Flat Shipping Fee
                    </label>
                    <input
                      type="number"
                      name="shippingFee"
                      step="0.01"
                      value={storeSettings.shippingFee}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition flex items-center"
              >
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

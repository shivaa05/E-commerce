import React, { useState, useEffect } from "react";
import AdminNav from "../../components/Admin/AdminNav";
import { Plus, Edit2, Trash2, Tag, Package, Search } from "lucide-react";
import { useProductStore } from "../../store/ProductStore";

const AdminProducts = () => {
  const {
    products,
    fetchAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
  } = useProductStore();
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  // Form states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: 0,
    gender: "",
  });
  const [stockToUpdate, setStockToUpdate] = useState(0);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Assuming backend data is not fully wired yet, fetching if necessary
    fetchAllProducts();
  }, []);

  const handleEditStock = (product) => {
    setSelectedProduct(product);
    setStockToUpdate(product.stock || 0);
    setShowStockModal(true);
  };

  const handleSaveStock = async () => {
    if (selectedProduct) {
      const success = await updateStock(
        selectedProduct._id,
        Number(stockToUpdate),
      );
      if (success) setShowStockModal(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
    }
  };

  const handleOpenProductModal = (product = null) => {
    setSelectedProduct(product);
    setImageFiles([]);
    setImagePreviews([]);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
        gender: product.gender || "",
      });
      if (product.images && product.images.length > 0) {
        setImagePreviews(product.images);
      } else if (product.image) {
        setImagePreviews([product.image]);
      }
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        stock: 0,
        gender: "",
      });
    }
    setShowProductModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Generate previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSaveProduct = async () => {
    const submitData = new FormData();
    Object.keys(formData).forEach((key) =>
      submitData.append(key, formData[key]),
    );
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        submitData.append("images", file);
      });
    }

    let success = false;
    if (selectedProduct) {
      success = await updateProduct(selectedProduct._id, submitData);
    } else {
      success = await addProduct(submitData);
    }
    if (success) setShowProductModal(false);
  };

  const filteredProducts =
    products?.filter((p) =>
      p?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 fixed h-full z-10">
        <AdminNav />
      </div>

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Inventory
            </h1>
            <p className="text-gray-500 mt-1">
              Manage products, stock levels, and discount coupons.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowProductModal(true);
                setSelectedProduct(null);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center shadow-sm"
            >
              <Plus size={18} className="mr-2" /> Add Product
            </button>
            <button
              onClick={() => setShowCouponModal(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center shadow-sm"
            >
              <Tag size={18} className="mr-2" /> Add Coupon
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-max mb-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
              activeTab === "products"
                ? "bg-white shadow text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("coupons")}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${
              activeTab === "coupons"
                ? "bg-white shadow text-gray-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Coupons
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "products" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                Products
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-gray-500 text-sm border-b border-gray-100">
                    <th className="p-4 font-medium">Product Name</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Stock</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <tr
                        key={product._id || index}
                        className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 font-medium text-gray-900 flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded flex flex-shrink-0 items-center justify-center overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <Package size={20} className="text-gray-400" />
                            )}
                          </div>
                          <span>{product.name || "Unnamed Product"}</span>
                        </td>
                        <td className="p-4 text-gray-500">
                          {product.category || "N/A"}
                        </td>
                        <td className="p-4 font-medium text-gray-900">
                          ${product.price || "0.00"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              product.stock > 10
                                ? "bg-green-100 text-green-700"
                                : product.stock > 0
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.stock || 0} in stock
                          </span>
                        </td>
                        <td className="p-4 space-x-2 text-right">
                          <button
                            onClick={() => handleEditStock(product)}
                            className="text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors"
                            title="Update Stock"
                          >
                            <Package size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenProductModal(product)}
                            className="text-indigo-600 hover:bg-indigo-50 p-2 rounded transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        No products found. Click "Add Product" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Coupons Tab Content (Mock UI) */}
        {activeTab === "coupons" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Active Coupons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Dummy Coupon Cards */}
              <div className="border border-dashed border-orange-300 bg-orange-50 rounded-lg p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-orange-700 text-lg uppercase">
                    SUMMER25
                  </h3>
                  <p className="text-sm text-orange-600 mt-1">
                    25% off all electronics
                  </p>
                </div>
                <button className="text-red-500 hover:bg-white p-2 rounded-full shadow-sm">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="border border-dashed border-indigo-300 bg-indigo-50 rounded-lg p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-indigo-700 text-lg uppercase">
                    FREESHIP
                  </h3>
                  <p className="text-sm text-indigo-600 mt-1">
                    Free shipping on orders over $50
                  </p>
                </div>
                <button className="text-red-500 hover:bg-white p-2 rounded-full shadow-sm">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals placeholders */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full border rounded p-2"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Men</option>
                <option value="Female">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full border rounded p-2"
                />
                {imagePreviews.length > 0 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                    {imagePreviews.map((preview, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 shrink-0 border rounded overflow-hidden"
                      >
                        <img
                          src={preview}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <textarea
                placeholder="Description"
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded p-2"
              ></textarea>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowProductModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {selectedProduct ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Update Stock: {selectedProduct?.name}
            </h2>
            <div className="space-y-4">
              <label className="block text-sm text-gray-600">
                Current Stock:{" "}
                <span className="font-bold text-gray-900">
                  {selectedProduct?.stock || 0}
                </span>
              </label>
              <input
                type="number"
                placeholder="New Stock Quantity"
                value={stockToUpdate}
                onChange={(e) => setStockToUpdate(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowStockModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStock}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Stock
              </button>
            </div>
          </div>
        </div>
      )}

      {showCouponModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-100 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Coupon</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Coupon Code (e.g. SAVE20)"
                className="w-full border rounded p-2 uppercase"
              />
              <input
                type="number"
                placeholder="Discount Percentage (%)"
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCouponModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Add Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

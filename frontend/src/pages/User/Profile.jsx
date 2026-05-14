import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { User, Lock, Edit2, X, Check, Save } from "lucide-react";

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuthStore();

  const [activeTab, setActiveTab] = useState("profile"); // 'profile' or 'security'

  // Profile Form State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "" });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name || "", email: user.email || "" });
    }
  }, [user, isEditing]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        Loading Profile...
      </div>
    );
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProfile(profileData);
    if (res.success) {
      setIsEditing(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return; // Handled generally by native validation/toast but safe guard
    }
    const res = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
    if (res.success) {
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold shadow-sm mb-3">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-semibold text-gray-800 text-lg">
                {user?.name}
              </h2>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100 mt-2">
                {user?.role || "User"}
              </span>
            </div>

            <div className="p-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "profile" ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <User className="w-5 h-5" />
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === "security" ? "bg-indigo-50 text-indigo-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
              >
                <Lock className="w-5 h-5" />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Profile Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" /> Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </label>
                    <p className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                      {user?.name || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <p className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2 break-all">
                      {user?.email || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Member Since
                    </label>
                    <p className="text-lg font-medium text-gray-900 border-b border-gray-100 pb-2">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleProfileSubmit}
                  className="space-y-6 max-w-lg"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Save className="w-5 h-5" /> Save Changes
                  </button>
                </form>
              )}
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="p-6 md:p-8">
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Change Password
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>
              </div>

              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-6 max-w-lg"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all"
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${
                      passwordData.confirmPassword &&
                      passwordData.newPassword !== passwordData.confirmPassword
                        ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                        : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                    }`}
                    required
                    minLength={6}
                  />
                  {passwordData.confirmPassword &&
                    passwordData.newPassword !==
                      passwordData.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>
                <button
                  type="submit"
                  disabled={
                    passwordData.newPassword !== passwordData.confirmPassword
                  }
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Lock className="w-5 h-5" /> Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

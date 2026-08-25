import React, { useState } from "react";
import { User, Mail, Phone, Shield, Briefcase, Calendar, Key, Save } from "lucide-react";
import { Button } from "../components/common/Button";
import { useSales } from "../context/SalesContext";
import { toast } from "react-toastify";

export const Profile = () => {
  const { userProfile, updateProfile } = useSales();
  const [activeTab, setActiveTab] = useState("personal");

  const [formData, setFormData] = useState({
    fullName: userProfile.fullName,
    email: userProfile.email,
    phone: userProfile.phone
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password updated successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Avatar & Summary Profile Card matching Image #10 */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center flex flex-col items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-lg mb-4">
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">{userProfile.fullName}</h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-1">
              {userProfile.role}
            </span>
          </div>

          <div className="w-full border-t border-slate-100 pt-6 mt-6 space-y-3.5 text-left text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Mail className="w-4 h-4 text-slate-400" /> Email
              </span>
              <span className="font-bold text-slate-800 truncate max-w-[140px]">{userProfile.email}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Phone className="w-4 h-4 text-slate-400" /> Phone
              </span>
              <span className="font-bold text-slate-800">{userProfile.phone}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Shield className="w-4 h-4 text-slate-400" /> Employee ID
              </span>
              <span className="font-bold text-slate-800">{userProfile.employeeId}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Briefcase className="w-4 h-4 text-slate-400" /> Department
              </span>
              <span className="font-bold text-slate-800">{userProfile.department}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" /> Joined On
              </span>
              <span className="font-bold text-slate-800">{userProfile.joinedOn}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Forms matching Image #10 */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          
          {/* Tabs matching Reference Image #10 */}
          <div className="flex items-center gap-6 border-b border-slate-100 pb-4 mb-6">
            <button
              onClick={() => setActiveTab("personal")}
              className={`text-xs font-extrabold pb-2 transition-colors cursor-pointer ${
                activeTab === "personal"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`text-xs font-extrabold pb-2 transition-colors cursor-pointer ${
                activeTab === "password"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              Change Password
            </button>
          </div>

          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <form onSubmit={handleProfileSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={userProfile.employeeId}
                    disabled
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={userProfile.department}
                    disabled
                    className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <Button variant="primary" type="submit" icon={Save}>
                  Update Profile
                </Button>
              </div>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <Button variant="primary" type="submit" icon={Save}>
                  Update Password
                </Button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

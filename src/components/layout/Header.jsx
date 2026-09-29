import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Bell,
  Menu,
  User as UserIcon,
  LogOut,
  Clock,
  Search
} from "lucide-react";
import { useSales } from "../../context/SalesContext";

export const Header = ({ onOpenSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, notifications, markNotificationsRead, searchQuery, setSearchQuery } = useSales();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-slate-100 shadow-2xs">
      {/* Left Title & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-base sm:text-lg font-bold text-[#a855f7] tracking-tight">
          Sales Executive Portal
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar if needed */}
        <div className="hidden md:flex items-center relative w-56">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications && unreadCount > 0) {
                markNotificationsRead();
              }
            }}
            className="relative p-2 text-[#a855f7] hover:bg-purple-50 rounded-full transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown Card */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">Notifications</h4>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                  {notifications.length} total
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto my-2">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 px-1 hover:bg-slate-50 rounded-lg transition-colors flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 text-purple-600 mt-0.5 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{n.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge & Dropdown matching Reference Image */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="p-1.5 text-[#a855f7] hover:bg-purple-50 rounded-full transition-colors cursor-pointer"
            title="User Menu"
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#a855f7] flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-[#a855f7]" />
            </div>
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">{userProfile.fullName}</p>
                <p className="text-xs text-slate-500">{userProfile.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-purple-600 transition-colors"
              >
                <UserIcon className="w-4 h-4" />
                View Profile
              </Link>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/login");
                }}
                className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors border-t border-slate-100"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

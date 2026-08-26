import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ListTodo,
  BarChart3,
  User,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSales } from "../../context/SalesContext";
import { Logo } from "../common/Logo";

export const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse }) => {
  const navigate = useNavigate();
  const { userProfile } = useSales();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Companies", path: "/companies", icon: Building2 },
    { name: "My Activities", path: "/activities", icon: ListTodo },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: User }
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white text-slate-700 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-200/90 shadow-sm ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-72"}`}
      >
        {/* Brand Header with large crisp Logo */}
        <div className="flex items-center justify-between h-24 px-4 border-b border-slate-100 bg-white">
          <NavLink to="/dashboard" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <Logo isCollapsed={isCollapsed} size="md" />
          </NavLink>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle Button for Desktop */}
        <div className="hidden lg:flex px-3 py-2 border-t border-slate-100">
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 rounded-xl transition-colors gap-2"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full px-3.5 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

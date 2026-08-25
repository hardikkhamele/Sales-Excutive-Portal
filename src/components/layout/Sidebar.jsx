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
  Users,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useSales } from "../../context/SalesContext";

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
        className={`fixed top-0 left-0 z-50 h-screen bg-[#0b132b] text-slate-300 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800/60 shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Brand Header matching Reference Image */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-800/80 bg-[#090f23]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-white text-base tracking-tight truncate">Sales Team Portal</span>
                <span className="text-[10px] uppercase font-semibold text-blue-400 tracking-wider">Executive Workspace</span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
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
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
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
        <div className="hidden lg:flex px-3 py-2 border-t border-slate-800/40">
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-full py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors gap-2"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-slate-800/80 bg-[#090f23]/60">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 w-full px-3.5 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
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

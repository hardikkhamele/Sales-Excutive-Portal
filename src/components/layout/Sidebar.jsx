import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ListTodo,
  BarChart3,
  User,
  LogOut,
  IndianRupee,
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
    { name: "Revenue Management", path: "/revenue", icon: IndianRupee },
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
        className={`fixed top-0 left-0 z-50 h-screen flex flex-col transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-16" : "w-60"}`}
        style={{
          background: "linear-gradient(180deg, #d8b4fe 0%, #b87fd9 40%, #9333ea 100%)"
        }}
      >
        {/* Brand Header with Logo */}
        <div className="flex items-center justify-between h-16 px-3 bg-white shadow-xs">
          <NavLink to="/dashboard" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <Logo isCollapsed={isCollapsed} size="sm" />
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
        <nav className="flex-1 px-2.5 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? "bg-white text-[#9333ea] shadow-md font-bold"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`
                }
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle Button for Desktop */}
        <div className="hidden lg:flex px-2.5 py-1.5 border-t border-white/10">
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-full py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors gap-1.5"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!isCollapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>

        {/* Logout Button */}
        <div className="p-2.5 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-bold bg-white text-[#9333ea] shadow-md hover:bg-slate-50 transition-all cursor-pointer"
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4.5 h-4.5 shrink-0" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

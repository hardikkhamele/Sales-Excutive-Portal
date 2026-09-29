import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Home, ArrowLeft } from "lucide-react";

export const Breadcrumb = ({
  items = [],
  showBackButton = true,
  backPath,
  rightAction = null,
  className = ""
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <nav
      className={`w-full bg-white border border-slate-200/90 rounded-2xl px-4 py-2 shadow-2xs flex items-center justify-between gap-4 mb-2 transition-all ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Professional Aesthetic Circle Back Button */}
        {showBackButton && (
          <button
            onClick={handleBack}
            title="Go Back"
            aria-label="Go Back"
            className="group w-9 h-9 rounded-full bg-slate-50 hover:bg-purple-50 border border-slate-200/90 hover:border-purple-300 text-slate-600 hover:text-purple-600 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        {/* Separator Divider Line */}
        {showBackButton && <div className="h-5 w-[1px] bg-slate-200/80 shrink-0" />}

        {/* Static Professional Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto py-0.5 whitespace-nowrap scrollbar-none">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-purple-600 transition-colors cursor-pointer shrink-0 font-medium"
          >
            <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Home className="w-3.5 h-3.5" />
            </div>
            <span>Dashboard</span>
          </Link>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {isLast || !item.path ? (
                  <span className="font-bold text-slate-900 truncate max-w-[220px] sm:max-w-md bg-slate-100/90 px-2.5 py-1 rounded-lg text-xs border border-slate-200/60">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-slate-600 hover:text-purple-600 transition-colors cursor-pointer font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Optional Right Header Actions */}
      {rightAction && <div className="shrink-0 flex items-center gap-2">{rightAction}</div>}
    </nav>
  );
};

export default Breadcrumb;

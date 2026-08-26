import React from "react";

export const Logo = ({
  size = "md", // 'sm' | 'md' | 'lg' | 'xl'
  isCollapsed = false,
  className = ""
}) => {
  if (isCollapsed) {
    return (
      <div className={`flex items-center justify-center w-full ${className}`} title="Technokrate Hire">
        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 p-1.5 flex items-center justify-center hover:bg-slate-100 transition-colors shadow-xs">
          <img
            src="/logo-symbol.png"
            alt="Technokrate Hire"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  // Size scale settings for a large, bold, prominent logo
  const sizeMap = {
    sm: {
      icon: "h-8 w-auto min-w-[22px]",
      title: "text-lg",
      tagline: "text-[8px]",
      gap: "gap-1.5"
    },
    md: {
      icon: "h-12 w-auto min-w-[34px]",
      title: "text-[23px]",
      tagline: "text-[9.5px]",
      gap: "gap-2"
    },
    lg: {
      icon: "h-15 w-auto min-w-[42px]",
      title: "text-3xl sm:text-4xl",
      tagline: "text-xs",
      gap: "gap-2.5"
    },
    xl: {
      icon: "h-20 w-auto min-w-[56px]",
      title: "text-4xl sm:text-5xl",
      tagline: "text-sm",
      gap: "gap-3"
    }
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center ${current.gap} select-none ${className}`}>
      {/* Icon Symbol */}
      <img
        src="/logo-symbol.png"
        alt="Technokrate Hire"
        className={`${current.icon} shrink-0 object-contain`}
        style={{ imageRendering: "auto" }}
      />

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className={`flex items-center ${current.title} font-black tracking-tight text-slate-900 leading-none whitespace-nowrap`}>
          <span className="text-[#0f172a]">
            Technokrate
          </span>
          <span className="text-[#7526bf] ml-1 font-black">
            Hire
          </span>
        </div>

        {/* Tagline: SMART HIRING in orange, FASTER CAREERS in blue */}
        <div
          className={`flex items-center gap-1 mt-1 font-extrabold uppercase tracking-wide leading-none whitespace-nowrap ${current.tagline}`}
        >
          <span className="w-1.5 h-[1.5px] bg-[#ea580c] inline-block opacity-90 shrink-0" />
          <span className="text-[#ea580c]">SMART HIRING,</span>
          <span className="text-blue-600 ml-0.5">FASTER CAREERS</span>
          <span className="w-1.5 h-[1.5px] bg-blue-600 inline-block opacity-90 shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default Logo;

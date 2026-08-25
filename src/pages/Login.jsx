import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Lock, Mail, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("rahul.sharma@company.com");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back, Rahul Sharma!");
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] border border-slate-200/80">
        
        {/* Left Side Form Container */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            {/* Header Brand */}
            <div className="flex items-center">
              <img
                src="/Logo.jpg"
                alt="Technokrate Hire"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back!</h2>
              <p className="text-sm text-slate-500 font-medium mt-2">Please login to your account.</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); toast.info("Contact administrator to reset password."); }} className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Logging in..." : "Login"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Bottom Help Text */}
          <div className="mt-8 text-center text-xs text-slate-400 font-medium">
            Need help?{" "}
            <a href="#contact" onClick={(e) => { e.preventDefault(); toast.info("Admin Support: admin@company.com"); }} className="text-blue-600 font-bold hover:underline">
              Contact Admin
            </a>
          </div>
        </div>

        {/* Right Side Illustration Area matching Reference Image #1 */}
        <div className="lg:col-span-6 bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-800 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden hidden lg:flex">
          {/* Decorative shapes */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase">
              Sales Operations Hub
            </span>
          </div>

          {/* Vector Corporate Graphic SVG */}
          <div className="relative z-10 my-8 flex items-center justify-center">
            <svg viewBox="0 0 500 400" className="w-full max-w-md h-auto filter drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="50" y="80" width="400" height="260" rx="20" fill="white" fillOpacity="0.15" backdropFilter="blur(10px)" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
              <path d="M90 290 L170 210 L250 250 L340 140 L410 180" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="340" cy="140" r="8" fill="#3B82F6" stroke="white" strokeWidth="3"/>
              <circle cx="170" cy="210" r="6" fill="#60A5FA"/>
              <circle cx="250" cy="250" r="6" fill="#60A5FA"/>
              <g transform="translate(140, 110)">
                <rect x="0" y="0" width="90" height="60" rx="10" fill="white" fillOpacity="0.9"/>
                <text x="15" y="25" fill="#1E293B" fontSize="12" fontWeight="bold">Deals</text>
                <text x="15" y="45" fill="#2563EB" fontSize="16" fontWeight="800">+24.5%</text>
              </g>
              <g transform="translate(280, 200)">
                <rect x="0" y="0" width="100" height="65" rx="10" fill="#1E293B" fillOpacity="0.9"/>
                <text x="15" y="25" fill="#94A3B8" fontSize="11" fontWeight="bold">Onboarding</text>
                <text x="15" y="48" fill="#10B981" fontSize="18" fontWeight="800">86 Active</text>
              </g>
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold">Streamline Your Pipeline</h3>
            <p className="text-xs text-blue-100 mt-2 leading-relaxed opacity-90">
              Track discussions, manage company onboardings, follow up on deals, and inspect team targets in real-time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

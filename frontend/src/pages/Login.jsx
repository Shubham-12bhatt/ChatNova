import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, MessageCircle, Lock } from "lucide-react";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5 font-sans overflow-hidden">
      
      {/* Container for the animated border box */}
      <div className="relative group w-full max-w-[1200px] min-h-[700px] rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
        
        {/* Glow behind the border */}
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_35%,#1cd4e5_50%,transparent_65%,transparent_100%)] animate-[spin_4s_linear_infinite] blur-xl opacity-80 group-hover:opacity-100 transition duration-500"></div>

        {/* The sharp rotating border itself */}
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_35%,#1cd4e5_50%,transparent_65%,transparent_100%)] animate-[spin_4s_linear_infinite]"></div>

        {/* Inner Card (The actual content container) */}
        <div className="absolute inset-[2px] bg-[#1a2133] rounded-[14px] z-10 flex overflow-hidden">
        
        {/* Left Column - Form */}
        <div className="w-full md:w-[45%] p-8 sm:p-14 flex flex-col justify-center relative border-r border-slate-700/30">
          
          <div className="w-full max-w-sm mx-auto">
            {/* Logo and Titles */}
            <div className="flex flex-col items-center mb-8">
              <MessageCircle size={36} className="text-slate-300 mb-3" />
              <h2 className="text-[22px] font-bold text-slate-100 mb-1">Welcome Back</h2>
              <p className="text-slate-400 text-[13px]">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-slate-200">Email</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111727] border border-slate-700/50 rounded-lg py-2.5 pl-[42px] pr-4 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm text-slate-200 placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-slate-200">Password</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-[#111727] border border-slate-700/50 rounded-lg py-2.5 pl-[42px] pr-4 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm text-slate-200 placeholder:text-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="mt-5 w-full bg-[#1cd4e5] hover:bg-[#15c5db] text-slate-900 font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-[15px]"
              >
                {isLoggingIn ? (
                  <span className="animate-spin w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full"></span>
                ) : (
                  "Login"
                )}
              </button>
              
              {/* Bottom signup link */}
              <div className="mt-4 text-center">
                <Link to="/signup" className="inline-block px-5 py-2.5 bg-[#172b38] rounded-md text-[13px] font-medium text-[#1cd4e5] hover:bg-[#1a3242] transition-colors">
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column - Image & Badges */}
        <div className="hidden md:flex w-[55%] flex-col items-center justify-center p-12 relative bg-[#1c2438]">
          <div className="w-full max-w-lg relative z-10 flex flex-col items-center mt-8">
            <img 
              src="/login.png" 
              alt="Login Illustration" 
              className="w-full scale-125 object-contain mb-14 drop-shadow-2xl translate-x-3" 
            />
            
            <h3 className="text-[22px] font-medium text-[#1cd4e5] mb-6">Welcome Back to ChatNova</h3>
            
            <div className="flex gap-4">
              <span className="px-5 py-1.5 rounded-full bg-[#203248] text-[#1cd4e5] text-xs font-medium border border-slate-700/30 shadow-sm backdrop-blur-sm">
                Secure
              </span>
              <span className="px-5 py-1.5 rounded-full bg-[#203248] text-[#1cd4e5] text-xs font-medium border border-slate-700/30 shadow-sm backdrop-blur-sm">
                Fast Connection
              </span>
              <span className="px-5 py-1.5 rounded-full bg-[#203248] text-[#1cd4e5] text-xs font-medium border border-slate-700/30 shadow-sm backdrop-blur-sm">
                Reliable
              </span>
            </div>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
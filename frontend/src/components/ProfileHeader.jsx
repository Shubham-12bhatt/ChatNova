import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      };
    }
  };

  return (
    <div className="w-full p-4 border-b border-slate-700/30 shrink-0">
      <div className="flex items-center justify-between">
        {/* Left side: Avatar and Info */}
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="relative group/avatar">
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={isUpdatingProfile}
              className="relative block rounded-full overflow-hidden w-12 h-12 border-2 border-slate-700/50 hover:border-[#1cd4e5] focus:outline-none focus:border-[#1cd4e5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt={authUser.fullName}
                className="w-full h-full object-cover"
              />
              {/* Loading overlay */}
              {isUpdatingProfile && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 transition-opacity duration-300">
                  <div className="w-5 h-5 border-2 border-[#1cd4e5] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Hover overlay for 'Change' */}
              {!isUpdatingProfile && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-[9px] uppercase font-bold tracking-wider">
                    Change
                  </span>
                </div>
              )}
            </button>
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#1a2133] rounded-full"></span>
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="text-slate-100 font-semibold text-base leading-tight">
              {authUser.fullName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              
              <p className="text-green-500/90 text-xs font-medium tracking-wide">
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Right side: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound toggle button */}
          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed", error));
              toggleSound();
            }}
            className={`p-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
              isSoundEnabled 
                ? "bg-slate-800/50 text-[#1cd4e5] hover:bg-slate-700/50 hover:text-[#2ceefd]" 
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-700/30"
            }`}
            title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
          >
            {isSoundEnabled ? <Volume2Icon size={20} /> : <VolumeOffIcon size={20} />}
          </button>

          {/* Logout button */}
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center group"
            title="Logout"
          >
            <LogOutIcon size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
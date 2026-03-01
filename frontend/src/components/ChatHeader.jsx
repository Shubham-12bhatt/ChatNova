import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [selectedUser, setSelectedUser]);

  return (
    <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-700/50 bg-[#1a2133]/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="avatar online relative">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-600/50 overflow-hidden shrink-0">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-slate-100 text-sm sm:text-base">
            {selectedUser.fullName}
          </h3>
          <p className="text-cyan-400 text-xs sm:text-sm font-medium">
            Online
          </p>
        </div>
      </div>
      <button 
        onClick={() => setSelectedUser(null)}
        className="p-2 cursor-pointer text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 rounded-full transition-colors duration-200"
      >
        <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
};

export default ChatHeader;
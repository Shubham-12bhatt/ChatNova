import { useChatStore } from "../store/useChatStore";
import { MessageSquare, Users } from "lucide-react";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  
  return (
    <div className="flex bg-base-300 p-1 m-2 rounded-xl relative overflow-hidden ring-1 ring-base-content/5">
      {/* Sliding Background Indicator */}
      <div 
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-base-100 rounded-lg shadow-sm transition-transform duration-300 ease-in-out ${
          activeTab === "chats" ? "translate-x-0" : "translate-x-full"
        }`}
      />

      <button
        onClick={() => setActiveTab("chats")}
        className={`relative z-10 flex-1 flex items-center cursor-pointer justify-center gap-2 py-2 text-sm font-medium transition-colors duration-300 ${
          activeTab === "chats" ? "text-primary" : "text-base-content/60 hover:text-base-content"
        }`}
      >
        <MessageSquare size={18} />
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`relative z-10 flex-1 flex items-center cursor-pointer justify-center gap-2 py-2 text-sm font-medium transition-colors duration-300 ${
          activeTab === "contacts" ? "text-primary" : "text-base-content/60 hover:text-base-content"
        }`}
      >
        <Users size={18} />
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
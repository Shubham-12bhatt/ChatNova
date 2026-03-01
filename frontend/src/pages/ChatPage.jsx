import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactsList from "../components/ContactsList";
import NoConversation from "../components/NoConversation";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";





const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
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
          
          {/* Left Sidebar */}
          <div className={`w-full md:w-80 lg:w-96 flex-col border-r border-slate-700/30 bg-[#1a2133] z-20 ${selectedUser ? "hidden md:flex" : "flex"}`}>
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto space-y-2 p-4 pt-1">
              {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
            </div>
          </div>

          {/* Right side */}
          <div className={`flex-1 flex-col bg-slate-900/50 backdrop-blur-sm relative z-10 ${!selectedUser ? "hidden md:flex" : "flex"}`}>
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
          
        </div>
          
        </div>
      </div>
  
  );
};

export default ChatPage;
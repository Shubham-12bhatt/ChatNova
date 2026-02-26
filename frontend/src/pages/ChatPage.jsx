import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactsList from "../components/ContactsList";
import NoConversation from "../components/NoConversation";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../store/useChatStore";





const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="w-full flex items-center justify-center pt-8 px-4 font-sans overflow-hidden">
      {/* Container for the animated border box */}
      <div className="relative group w-full max-w-6xl h-[800px] rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
        
        {/* Glow behind the border */}
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_35%,#1cd4e5_50%,transparent_65%,transparent_100%)] animate-[spin_4s_linear_infinite] blur-xl opacity-80 group-hover:opacity-100 transition duration-500"></div>

        {/* The sharp rotating border itself */}
        <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_35%,#1cd4e5_50%,transparent_65%,transparent_100%)] animate-[spin_4s_linear_infinite]"></div>

        {/* Inner Card (The actual content container) */}
        <div className="absolute inset-[2px] bg-[#1a2133] rounded-[14px] z-10 flex overflow-hidden">
          
          {/* left side */}
          <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col border-r border-slate-700/30">
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto space-y-2 p-4">
              {activeTab === "chats" ? <ChatsList/> : <ContactsList/>
              }
            </div>
          </div>

          {/* right side */}
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
            {selectedUser ? <ChatContainer /> : <NoConversation/>
            }
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
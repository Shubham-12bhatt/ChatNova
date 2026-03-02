import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import UsersLoadingSkel from "./UsersLoadingSkel";
import NoChatsFound from "./NoChatsFound";
const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);
  if (isUsersLoading) return <UsersLoadingSkel />
  if(chats.length === 0) return <NoChatsFound/>
  return (
    <div className="space-y-2 w-full">
      {chats.map(chat => (
        <div key={chat._id}
        onClick={() => setSelectedUser(chat)}
        className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all w-full ${
          selectedUser?._id === chat._id
            ? "bg-slate-700/80 ring-1 ring-cyan-500"
            : "bg-slate-800/30 hover:bg-slate-800/50"
        }`}
        >
          <div className="relative shrink-0">
            <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="w-12 h-12 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
          </div> 
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
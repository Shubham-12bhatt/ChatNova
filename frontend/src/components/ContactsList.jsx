import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import UsersLoadingSkel from "./UsersLoadingSkel";
import { useAuthStore } from "../store/useAuthStore";
const ContactsList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, selectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore();
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);
  if(isUsersLoading) return <UsersLoadingSkel/>
  return (
    <div className="space-y-2 w-full">
      {allContacts.map(contact => (
        <div key={contact._id}
        onClick={() => setSelectedUser(contact)}
        className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all w-full ${
          selectedUser?._id === contact._id
            ? "bg-slate-700/80 ring-1 ring-cyan-500"
            : "bg-slate-800/30 hover:bg-slate-800/90"
        }`}
        >
          <div className="relative shrink-0">
            <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} className="w-12 h-12 rounded-full object-cover" />
            {onlineUsers.includes(contact._id) ? <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span> : <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-slate-900"></span>}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-200 font-medium truncate">{contact.fullName}</h4>
          </div> 
        </div>
      ))}
    </div>
  );
};

export default ContactsList;
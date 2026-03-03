import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading,subscribeToMessage,unsubscribeToMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messageContainerRef = useRef(null);
  
    useEffect(() => {
      if (selectedUser) {
        getMessagesByUserId(selectedUser._id);
        subscribeToMessage();
      }
      return () => {
        unsubscribeToMessage();
      }
    }, [selectedUser, getMessagesByUserId,subscribeToMessage,unsubscribeToMessage]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);



  
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col w-full h-full bg-slate-900/50">
        <ChatHeader />
        <MessagesLoadingSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full h-full bg-slate-900/50">
      <ChatHeader />

      <div ref={messageContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth">
        {messages.length > 0 ? (
          <div>
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative flex flex-col gap-1 max-w-[80%] sm:max-w-[70%] ${
                    message.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="shared content"
                      className="w-full max-h-60 sm:max-h-80 object-cover rounded-lg mb-1"
                    />
                  )}
                  {message.text && <p className="text-sm md:text-base leading-relaxed">{message.text}</p>}
                  <span className="text-[10px] sm:text-xs opacity-70 mt-1 self-end">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              
            ))}
           
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
        
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
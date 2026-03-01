function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 space-y-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          <div className="chat-image avatar hidden sm:block">
            <div className="w-8 h-8 rounded-full bg-slate-700/50"></div>
          </div>
          <div 
            className={`chat-bubble bg-slate-700/50 rounded-xl ${
              index % 2 === 0 ? "w-32 sm:w-48 h-12 sm:h-16" : "w-40 sm:w-64 h-16 sm:h-20"
            }`}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;
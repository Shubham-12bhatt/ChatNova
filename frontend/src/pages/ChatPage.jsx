




const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ChatPage;
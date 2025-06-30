import ChatList from "../components/Chat/ChatList";
import ChatBox from "../components/Chat/ChatBox";

const ChatPage = () => {
  return (
    <div className="flex w-full h-screen md:ml-80">
      <ChatList />
      <ChatBox />
    </div>
  );
};

export default ChatPage;

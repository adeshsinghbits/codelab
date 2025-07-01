import ChatList from "./ChatList";
import ChatBox from "./ChatBox";

const ChatPage = () => {
  return (
    <div className="flex w-full h-screen md:ml-80">
      <ChatList />
      <ChatBox />
    </div>
  );
};

export default ChatPage;

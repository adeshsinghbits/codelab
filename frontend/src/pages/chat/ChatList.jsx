import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../features/chat/chatThunks";
import { setSelectedChat } from "../../features/chat/chatSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  const { chats, loading, selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="w-full  md:w-1/3 lg:w-1/4 bg-gray-100 p-4 overflow-y-auto h-64 md:h-auto border-r border-gray-300">
      <h2 className="font-bold mb-4 text-lg text-center md:text-left">Chats</h2>
      {loading ? (
        <p>Loading chats...</p>
      ) : (
        chats.map((chat) => {
          const uniqueUsers = chat.users.filter((u) => u._id !== user._id);
          const otherUser = uniqueUsers.length > 0 ? uniqueUsers[0] : user;

          return (
            <div
              key={chat._id}
              className={`p-2 mb-2 rounded cursor-pointer flex items-center space-x-3 transition-all ${
                selectedChat?._id === chat._id ? "bg-emerald-200" : "bg-white"
              }`}
              onClick={() => dispatch(setSelectedChat(chat))}
            >
              <img
                src={otherUser?.picture}
                alt={otherUser?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium truncate">{otherUser?.name}</span>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatList;

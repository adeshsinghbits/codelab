import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, sendMessage } from "../../features/chat/chatThunks";
import { addMessage } from "../../features/chat/chatSlice";
import socketIOClient from "socket.io-client";
import { LuSendHorizontal } from "react-icons/lu";

// ✅ Connect to backend using env variable
const socket = socketIOClient(import.meta.env.VITE_BACKEND_URL);

const ChatBox = () => {
  const dispatch = useDispatch();
  const { selectedChat, messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  // ✅ Handle incoming messages & notifications
  useEffect(() => {
    if (!("Notification" in window)) {
      console.warn("❌ Browser does not support notifications.");
    } else if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));

    socket.on("message recieved", (msg) => {
      const isSameChat = msg.chatId._id === selectedChat?._id;
      const isNotSender = msg.sender._id !== user._id;

      // ✅ Add to messages only if relevant
      if (isSameChat && isNotSender) {
        dispatch(addMessage(msg));
      }

      // ✅ Trigger notification if tab not focused
      if (isNotSender && !document.hasFocus()) {
        const title = `📨 Message from ${msg.sender.name || "Someone"}`;
        const body = msg.content || "New message received";

        const showNotification = () => {
          new Notification(title, {
            body,
            icon: msg.sender.picture || "/default-icon.png",
          });

          // Optional: Play sound
          const audio = new Audio("/notification.mp3");
          audio.play().catch(() => {});
        };

        if (Notification.permission === "granted") {
          showNotification();
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((perm) => {
            if (perm === "granted") showNotification();
          });
        } else {
          console.warn("❌ Notification permission denied.");
        }
      }
    });

    return () => socket.off("message recieved");
  }, [dispatch, selectedChat, user]);

  // ✅ Join selected chat room and fetch messages
  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchMessages(selectedChat._id));
      socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat, dispatch]);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    dispatch(sendMessage({ chatId: selectedChat._id, content: message }, socket));
    setMessage("");
  };

  if (!selectedChat) {
    return (
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 flex items-center justify-center text-gray-500">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col p-4 bg-white h-[calc(100vh-2rem)] md:h-full">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4">
        {messages.map((msg) => {
          const isSender = msg.sender._id === user._id;
          return (
            <div key={msg._id} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  isSender
                    ? "bg-emerald-200 rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                <div className="text-sm font-medium">{msg.sender.name}</div>
                <div>{msg.content}</div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex">
        <input
          type="text"
          className="flex-1 border-2 border-r-0 rounded-l-4xl p-2 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-l-0 border-black text-white rounded-r-4xl px-4"
          onClick={handleSendMessage}
        >
          <LuSendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

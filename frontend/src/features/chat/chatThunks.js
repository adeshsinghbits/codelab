// src/features/chat/chatThunks.js
import axiosInstance from "../../utils/axiosInstance";
import { setChats, setMessages, setChatLoading, addMessage, setConnections } from "./chatSlice";

export const fetchChats = () => async (dispatch) => {
  try {
    dispatch(setChatLoading(true));
    const { data } = await axiosInstance.get("/chat");
    dispatch(setChats(data.data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setChatLoading(false));
  }
};

export const fetchMessages = (chatId) => async (dispatch) => {
  try {
    dispatch(setChatLoading(true));
    const { data } = await axiosInstance.get(`/message/getMessages/${chatId}`);
    dispatch(setMessages(data.data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setChatLoading(false));
  }
};

export const sendMessage = (messageData, socket) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post("/message/sendMessage", messageData);
    dispatch(addMessage(data.data));
    if (socket) {
      socket.emit("new message", data.data);
    }
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

export const fetchConnections = (currentUserId) => async (dispatch) => {
  try {
    dispatch(setChatLoading(true));
    const { data } = await axiosInstance.get("/chat"); // Already returns all chats
    const chats = data.data;

    // Extract connections
    const connections = chats
      .map(chat => chat.users.find(user => user._id !== currentUserId))
      .filter(Boolean); // remove undefined

    dispatch(setConnections(connections)); // 👇 you'll add this in slice
  } catch (err) {
    console.error("Error fetching connections:", err);
  } finally {
    dispatch(setChatLoading(false));
  }
};

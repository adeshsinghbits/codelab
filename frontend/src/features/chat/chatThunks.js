// src/features/chat/chatThunks.js
import axiosInstance from "../../utils/axiosInstance";
import { setChats, setMessages, setChatLoading, addMessage } from "./chatSlice";

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

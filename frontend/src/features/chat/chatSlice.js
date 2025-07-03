import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedChat: null,
    messages: [],
    loading: false,
    connections: [], 
  },
  reducers: {
    setChats: (state, action) => { state.chats = action.payload; },
    setSelectedChat: (state, action) => { state.selectedChat = action.payload; },
    setMessages: (state, action) => { state.messages = action.payload; },
    addMessage: (state, action) => { state.messages.push(action.payload); },
    setChatLoading: (state, action) => { state.loading = action.payload; },
    setConnections: (state, action) => { state.connections = action.payload; },
  },
});

export const { setChats, setSelectedChat, setMessages, addMessage, setChatLoading, setConnections } = chatSlice.actions;
export default chatSlice.reducer;

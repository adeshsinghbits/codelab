// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import eventReducer from "../features/event/eventSlice";
import notifiationReducer from "../features/notification/notificationSlice";
import gigReducer from "../features/gig/gigSlice";
import orderReducer from "../features/order/orderSlice";
import chatReducer from "../features/chat/chatSlice";
import requestReducer from "../features/request/requestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    event: eventReducer,
    notification: notifiationReducer,
    gig: gigReducer,
    order: orderReducer,
    chat: chatReducer,
    request: requestReducer,
  },
});

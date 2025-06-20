// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import eventReducer from "../features/event/eventSlice";
import courseReducer from "../features/course/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    event: eventReducer,
    course: courseReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    loading: false,
  },
  reducers: {
    setRequests: (state, action) => { state.requests = action.payload; },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(r => r._id !== action.payload);
    },
    setRequestLoading: (state, action) => { state.loading = action.payload; },
  },
});

export const { setRequests, removeRequest, setRequestLoading } = requestSlice.actions;
export default requestSlice.reducer;

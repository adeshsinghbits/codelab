import axiosInstance from "../../utils/axiosInstance";
import { setRequests, removeRequest, setRequestLoading } from "./requestSlice";
import { toast } from "react-hot-toast";

export const fetchRequests = () => async (dispatch) => {
  try {
    dispatch(setRequestLoading(true));
    const { data } = await axiosInstance.get("/request/getRequests");
    dispatch(setRequests(data.data));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setRequestLoading(false));
  }
};

export const createRequest = (receiverID) => async () => {
  try {
    const { data } = await axiosInstance.post("/request/createRequest", { receiverID });
    toast.success(data.message);
  } catch (err) {
    console.error("Create Request Error:", err);
    toast.error(err?.response?.data?.message || "Failed to send request");
  }
};

export const acceptRequest = (requestId) => async (dispatch) => {
  try {
    await axiosInstance.post("/request/acceptRequest", { requestId });
    dispatch(removeRequest(requestId));
  } catch (err) {
    console.error(err);
  }
};

export const rejectRequest = (requestId) => async (dispatch) => {
  try {
    await axiosInstance.post("/request/rejectRequest", { requestId });
    dispatch(removeRequest(requestId));
  } catch (err) {
    console.error(err);
  }
};

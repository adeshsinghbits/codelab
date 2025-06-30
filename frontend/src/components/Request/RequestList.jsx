import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, acceptRequest, rejectRequest } from "../../features/request/requestThunk";

const RequestList = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(fetchRequests());
  }, []);

  return (
    <div className="w-1/3 bg-gray-200 p-4">
      <h2 className="font-bold mb-4">Connection Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} className="mb-2 p-2 bg-white rounded shadow">
            <div>{req.name}</div>
            <div className="mt-2 flex gap-2">
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition"
                  onClick={() => dispatch(acceptRequest(req._id))}
                  title="Accept"
                >
                  ✔️
                </button>
                <button
                  className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                  onClick={() => dispatch(rejectRequest(req._id))}
                  
                >
                  ❌
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestList;

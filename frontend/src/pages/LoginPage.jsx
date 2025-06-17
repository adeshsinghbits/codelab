import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogleThunk } from "../features/auth/authThunk";

function LoginPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        <button
          onClick={() => dispatch(loginWithGoogleThunk())}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </button>
        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { googleLoginThunk } from "../../features/auth/authThunk";

function SignUpPage() {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.auth);
console.log(isLoading);

  const handleLogin = () => {
    if (!isLoading) {
      dispatch(googleLoginThunk());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4">
      <div className="bg-white p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Join CodeLab
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Create your account in seconds.
        </p>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className={`flex items-center justify-center gap-3 w-full py-3 px-4 border rounded-xl font-medium transition duration-200 cursor-pointer ${
            isLoading
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
          }`}
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin text-xl" />
              Signing in...
            </>
          ) : (
            <>
              <FcGoogle className="text-2xl" />
              Continue with Google
            </>
          )}
        </button>

        <p className="mt-6 text-xs text-center text-gray-400">
          We’ll never post anything without your permission.
        </p>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;

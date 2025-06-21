import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { googleLoginThunk } from '../features/auth/authThunk';

function SignUpPage() {
  
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(googleLoginThunk());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h1>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>
        <p className="mt-6 text-sm text-center text-gray-500">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;

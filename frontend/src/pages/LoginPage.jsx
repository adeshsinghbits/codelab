import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { googleLoginThunk } from '../features/auth/authThunk';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(googleLoginThunk());
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center overflow-hidden">
      {/* Floating Decorative Icons */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 4 }}
        className="absolute top-10 left-10 text-purple-400 text-4xl opacity-30"
      >
        <FaUserAlt />
      </motion.div>

      <motion.div
        initial={{ y: 50 }}
        animate={{ y: -20 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 5 }}
        className="absolute bottom-16 right-16 text-blue-400 text-5xl opacity-20"
      >
        <FaLock />
      </motion.div>

      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
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

      {/* Soft glow / blurred floating elements */}
      <div className="absolute w-72 h-72 bg-purple-300 rounded-full filter blur-3xl opacity-30 top-0 left-0 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-blue-300 rounded-full filter blur-2xl opacity-20 bottom-0 right-0 animate-pulse delay-500"></div>
    </div>
  );
}

export default LoginPage;

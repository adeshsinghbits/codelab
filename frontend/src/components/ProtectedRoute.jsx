import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAuthenticatedUser } from '../features/auth/authThunk';
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import Layout from './Layout';

const ProtectedLayout = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchAuthenticatedUser());
    }
  }, [user, loading, dispatch]);

  if (loading || (!user && !error)) {
    return  <div className="flex md:ml-80 items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl animate-spin mx-auto text-indigo-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <FaSpinner />
        </motion.div>

        <h1 className="mt-6 text-2xl font-semibold tracking-wide">
          Preparing your experience...
        </h1>
        <p className="mt-2 text-gray-400">
          This won't take long. Sit back and relax ☕
        </p>
      </motion.div>
    </div>;
  }

  if (!user || error) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedLayout;

import React from 'react';
import { Link } from 'react-router-dom';
import caveman_coder_404 from '../assets/caveman_404.gif';

function NotFound() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background GIF */}
      <img 
        src={caveman_coder_404}
        alt="Lost in space" 
        className="absolute top-0 left-0 w-full h-full object-cover z-0" 
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-60  flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-2xl font-semibold md:text-3xl mb-6">Oops... Looks like you're lost in the void.</p>
        <p>The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="mt-4 px-6 py-3 bg-green-700 text-black font-semibold rounded-lg hover:bg-green-800 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

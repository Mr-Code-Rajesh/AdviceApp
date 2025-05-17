import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import clickSound from './assets/audio/Click.wav'; 

export const Adviceapp = () => {
  const [advice, setAdvice] = useState('Click the button to receive a fresh dose of advice!');
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount(prev => prev + 1);
    } catch (err) {
      setAdvice("Oops! Failed to fetch advice. Try again later.");
    }
    setLoading(false);
  };

  const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
    fetchAdvice();
  };

  //  Auto fetch every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAdvice();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval); // clear interval on unmount
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-10 items-center justify-center font-poppins relative overflow-hidden">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      {/* Advice Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-[90%] max-w-md bg-white/10 border border-white/20 text-white rounded-xl p-8 shadow-2xl backdrop-blur-md flex flex-col gap-6 text-center"
      >
        <h1 className="text-xl md:text-2xl font-semibold leading-relaxed italic">
          {loading ? (
            <div className="flex justify-center items-center gap-2">
              <FaSpinner className="animate-spin text-pink-300" />
              <span className="text-sm">Fetching wisdom...</span>
            </div>
          ) : (
            `“${advice}”`
          )}
        </h1>

        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-200">Advice Count</p>
          <span className="bg-white text-pink-600 font-bold px-4 py-1 rounded-full shadow">
            {count}
          </span>
        </div>

        <button
          onClick={handleClick}
          className="bg-white cursor-pointer text-pink-500 font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Get Advice 🔁'}
        </button>
      </motion.div>

      <div className="relative z-50 w-96 text-center py-4 bg-white/20 rounded-2xl">
  <p className="text-sm md:text-base font-medium text-white ">
    Developed with 💖 by
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 font-bold mx-1">
      Saktrix
    </span>
    © {new Date().getFullYear()}
  </p>
</div>
    </div>
  );
};

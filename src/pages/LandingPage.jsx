import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-cyan-400 opacity-20 blur-3xl rounded-full"></div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-6xl font-bold mb-4"
      >
        MediVault 🔐
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-gray-400 mb-8 max-w-xl"
      >
        Secure, decentralized medical records powered by blockchain &
        zero-knowledge proofs.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/register/patient"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg hover:scale-105 transition"
        >
          Register as Patient
        </Link>

        <Link
          to="/register/doctor"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg hover:scale-105 transition"
        >
          Register as Doctor
        </Link>

        <Link
          to="/login"
          className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
        >
          Login
        </Link>
      </motion.div>
    </section>
  );
};

export default LandingPage;

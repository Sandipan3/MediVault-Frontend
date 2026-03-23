import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-xl bg-white/5 border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-blue-300">MediVault</h2>
          <p className="text-sm text-gray-500">
            Secure medical data with blockchain & ZK proofs
          </p>
        </div>

        {/* Middle Links */}
        <div className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>
          <Link to="/login" className="hover:text-blue-400 transition">
            Login
          </Link>
          <Link
            to="/register/patient"
            className="hover:text-blue-400 transition"
          >
            Patient
          </Link>
          <Link
            to="/register/doctor"
            className="hover:text-blue-400 transition"
          >
            Doctor
          </Link>
        </div>

        {/* Right */}
        <div className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} MediVault
        </div>
      </div>
    </footer>
  );
};

export default Footer;

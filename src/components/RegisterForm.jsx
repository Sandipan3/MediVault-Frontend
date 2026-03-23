import React, { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ role }) => {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/register", {
        name,
        walletAddress,
        role, // ✅ injected here
      });

      if (res.data.status === "success") {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-blue-300 text-center">
        Register as {role}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-transparent border border-blue-400/30 text-white"
        />

        <input
          type="text"
          placeholder="Wallet Address"
          required
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="w-full p-3 rounded-lg bg-transparent border border-blue-400/30 text-white"
        />

        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-white font-semibold hover:scale-105 transition">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

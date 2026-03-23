import React from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { login, selectAuthLoading } from "../slices/authSlice";
import * as siwe from "siwe"; // npm install siwe@2.1.4

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!window.ethereum) {
        toast.error("Please install MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        toast.error("MetaMask wallet not connected!");
        return;
      }

      const rawAddress = accounts[0];
      const checksumAddress = ethers.getAddress(rawAddress);
      const lowercaseAddress = rawAddress.toLowerCase();

      const { data } = await api.post("auth/nonce", {
        walletAddress: lowercaseAddress,
      });

      const { nonce, domain, uri, chainId } = data;

      if (!nonce) {
        toast.error("Nonce not received from server!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const siweMessage = new siwe.SiweMessage({
        domain,
        address: checksumAddress,
        statement: "Sign in to MediVault",
        uri,
        version: "1",
        chainId: Number(chainId),
        nonce,
        issuedAt: new Date().toISOString(),
      });

      const messageToSign = siweMessage.prepareMessage();
      const signature = await signer.signMessage(messageToSign);

      const result = await dispatch(
        login({
          message: messageToSign,
          signature,
        }),
      );

      if (login.fulfilled.match(result)) {
        const user = result.payload.user;
        toast.success(`Welcome ${user.name}!`);

        if (user.role === "admin") navigate("/a");
        else if (user.role === "doctor") navigate("/d");
        else navigate("/p");
      } else {
        toast.error(result.payload || "Login failed!");
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.code === 4001) {
        toast.error("Signature request rejected.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a] text-white overflow-hidden">
      {/*  Glow Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-cyan-400 opacity-20 blur-3xl rounded-full"></div>

      {/*  Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl text-center">
        <h1 className="text-3xl font-bold mb-3 text-blue-300">
          Welcome to MediVault
        </h1>

        <p className="text-gray-400 mb-6">
          Secure login using your wallet. No passwords. No compromises.
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/30 hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Login with MetaMask"}
        </button>

        {/*  Trust note */}
        <p className="text-gray-500 text-sm mt-6">
          Powered by Ethereum • SIWE Authentication
        </p>
      </div>
    </section>
  );
};

export default Login;

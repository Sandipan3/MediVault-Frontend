import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthUser } from "../slices/authSlice";
import GetTransactions from "../components/GetTransactions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="p-6">
      <div className="text-lg font-semibold text-gray-800">Welcome back</div>

      {user && (
        <div className="mt-2 text-gray-700">
          <p>Name: {user.name}</p>
          <p>Wallet Address: {user.walletAddress}</p>
          <p>Contract Address: {import.meta.env.VITE_CONTRACT_ADDRESS}</p>
        </div>
      )}

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>

      <GetTransactions />
    </div>
  );
};

export default AdminDashboard;

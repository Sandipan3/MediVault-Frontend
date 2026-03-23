import React from "react";

const AccessStatusCard = ({
  doctorName,
  doctorAddress,
  onRevoke,
  revoking,
}) => (
  <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-400/20 rounded-2xl p-5 flex justify-between items-center shadow-lg">
    <div>
      <p className="text-blue-300 text-sm">Active Secure Access</p>
      <p className="font-semibold text-white">{doctorName}</p>
      <p className="text-xs font-mono text-gray-300 break-all">
        {doctorAddress}
      </p>
    </div>

    <button
      disabled={revoking}
      onClick={onRevoke}
      className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg text-white shadow-md transition"
    >
      {revoking ? "Revoking..." : "Revoke"}
    </button>
  </div>
);

export default AccessStatusCard;

import React from "react";

const DoctorAccessSection = ({
  patientAddress,
  setPatientAddress,
  onCheckAccess,
  checking,
}) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
    <input
      type="text"
      placeholder="Enter Patient Wallet Address"
      value={patientAddress}
      onChange={(e) => setPatientAddress(e.target.value)}
      className="flex-1 bg-transparent border border-blue-400/30 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      disabled={checking}
      onClick={onCheckAccess}
      className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105 transition text-white px-5 py-2 rounded-lg shadow-lg shadow-blue-500/30 disabled:opacity-50"
    >
      {checking ? "Checking..." : "Check Access"}
    </button>
  </div>
);

export default DoctorAccessSection;

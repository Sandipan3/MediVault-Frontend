import React from "react";

const PatientDetailsCard = ({ patientInfo, docCount }) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
    <h3 className="text-lg font-semibold mb-3 text-blue-300">
      Patient Details
    </h3>

    <p className="text-gray-300">
      <span className="text-white font-semibold">Name:</span> {patientInfo.name}
    </p>

    <p className="text-gray-400 font-mono break-all">
      <span className="text-white font-semibold">Wallet:</span>{" "}
      {patientInfo.walletAddress}
    </p>

    <p className="text-gray-300 mt-2">
      <span className="text-white font-semibold">Shared Documents:</span>{" "}
      <span className="text-blue-400 font-semibold">{docCount}</span>
    </p>
  </div>
);

export default PatientDetailsCard;

import React from "react";

const WalletDisplay = ({ wallet }) => (
  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg">
    <p className="text-xs text-blue-300 mb-1">Connected Wallet</p>
    <p className="font-mono text-sm text-white break-all">{wallet}</p>
  </div>
);

export default WalletDisplay;

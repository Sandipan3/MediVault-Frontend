import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";

const GetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [txDetails, setTxDetails] = useState([]);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/transactions");

        if (res.data?.success) {
          setTransactions(res.data.data || []);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error(err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleRowClick = async (hash) => {
    try {
      setSelectedTx(hash);
      setDetailsLoading(true);

      const res = await api.get(`/admin/transactions/${hash}`);

      if (res.data?.success) {
        setTxDetails(res.data.data || []);
      } else {
        setTxDetails([]);
      }
    } catch (err) {
      console.error(err);
      setTxDetails([]);
    } finally {
      setDetailsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTx && !detailsLoading) {
      detailsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTx, detailsLoading]);

  return (
    <div className="mt-6 px-2 sm:px-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Transactions
      </h2>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Hash</th>
              <th className="p-3">Function</th>
              <th className="p-3">Block</th>
              <th className="p-3">Gas</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr
                  key={tx.hash}
                  onClick={() => handleRowClick(tx.hash)}
                  className={`cursor-pointer border-b ${
                    selectedTx === tx.hash ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-3 text-blue-600">
                    {tx.hash.slice(0, 10)}...
                  </td>

                  <td className="p-3">
                    {tx.to === ""
                      ? "Contract Deployment"
                      : tx.functionName || "—"}
                  </td>

                  <td className="p-3">{tx.blockNumber}</td>

                  <td className="p-3">{tx.gasUsed}</td>

                  <td className="p-3">
                    {tx.isError === "0" ? (
                      <span className="text-green-600">Success</span>
                    ) : (
                      <span className="text-red-600">Failed</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : transactions.length > 0 ? (
          transactions.map((tx) => (
            <div
              key={tx.hash}
              onClick={() => handleRowClick(tx.hash)}
              className={`p-3 rounded-lg shadow bg-white cursor-pointer ${
                selectedTx === tx.hash ? "border border-blue-400" : ""
              }`}
            >
              <p className="text-blue-600 text-sm">{tx.hash.slice(0, 12)}...</p>

              <p className="text-sm mt-1">
                {tx.isDeployment ? "Deployment" : tx.functionName || "—"}
              </p>

              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Block #{tx.blockNumber}</span>
                <span>{tx.gasUsed} gas</span>
              </div>

              <div className="mt-2">
                {tx.isError === "0" ? (
                  <span className="text-green-600 text-xs">Success</span>
                ) : (
                  <span className="text-red-600 text-xs">Failed</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions</p>
        )}
      </div>

      {/* DETAILS */}
      {selectedTx && (
        <div ref={detailsRef} className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="text-md sm:text-lg font-semibold mb-3 text-gray-800">
            Transaction Details
          </h3>

          {detailsLoading ? (
            <p>Loading...</p>
          ) : txDetails.length === 0 ? (
            <p>No events found</p>
          ) : (
            txDetails.map((event, index) => (
              <div
                key={index}
                className="border p-3 rounded mb-3 bg-gray-50 text-sm"
              >
                <p className="font-medium text-blue-600">{event.eventName}</p>

                <p className="break-all">
                  <strong>Patient:</strong> {event.patient}
                </p>

                <p className="break-all">
                  <strong>Doctor:</strong> {event.doctor}
                </p>

                {event.expiry && (
                  <p>
                    <strong>Expiry:</strong>{" "}
                    {new Date(event.expiry * 1000).toLocaleString()}
                  </p>
                )}

                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                    event.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GetTransactions;

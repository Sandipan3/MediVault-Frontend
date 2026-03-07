import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuthUser } from "../slices/authSlice";
import toast from "react-hot-toast";
import api from "../api/api";
import * as snarkjs from "snarkjs";
import { ethers } from "ethers";

import DashboardHeader from "../components/DashboardHeader";
import WalletDisplay from "../components/WalletDisplay";
import DocumentGrid from "../components/DocumentGrid";
import PatientAccessSection from "../components/PatientAccessSection";
import AccessStatusCard from "../components/AccessStatusCard";
import AddReport from "../components/AddReport";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  const [docs, setDocs] = useState([]);

  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [grantedDoctor, setGrantedDoctor] = useState(null);

  const [granting, setGranting] = useState(false);
  const [revoking, setRevoking] = useState(false);

  const [showAddReport, setShowAddReport] = useState(false);

  const fetchDocs = async () => {
    try {
      const res = await api.get("document");
      setDocs(res.data.data);
    } catch {
      toast.error("Error fetching documents");
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleGrantAccess = async () => {
    try {
      if (!doctorAddress) {
        return toast.error("Enter doctor wallet address");
      }

      setGranting(true);

      const res = await api.post("/access/grant", {
        doctor: doctorAddress,
      });

      if (res.data.status === "success") {
        toast.success("Access granted (valid 15 mins)");

        const userRes = await api.get(`auth/user/${doctorAddress}`);

        setDoctorName(userRes.data.data.name);
        setGrantedDoctor(doctorAddress);
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Error granting access");
    } finally {
      setGranting(false);
      setDoctorAddress("");
    }
  };

  const handleRevokeAccess = async () => {
    try {
      if (!grantedDoctor) {
        return toast.error("No active access to revoke");
      }

      setRevoking(true);

      const res = await api.post("/access/revoke", {
        doctor: grantedDoctor,
      });

      if (res.data.status === "success") {
        toast.success("Access revoked");

        setGrantedDoctor(null);
        setDoctorName("");
      } else {
        toast.error("Failed to revoke access");
      }
    } catch {
      toast.error("Error revoking access");
    } finally {
      setRevoking(false);
    }
  };

  const handleDelete = async (docId) => {
    try {
      await api.delete(`document/${docId}`);

      toast.success("Document deleted");

      fetchDocs();
    } catch {
      toast.error("Error deleting document");
    }
  };

  const handleProveOwnership = async (doc) => {
    try {
      toast.loading("Generating ZK proof...");

      // request merkle path
      const pathRes = await api.get(`/zkp/path/${doc._id}`);

      const { root, pathElements, pathIndices } = pathRes.data;

      // hash CID
      const SNARK_FIELD = BigInt(
        "21888242871839275222246405745257275088548364400416034343698204186575808495617",
      );

      const cidHash = (
        BigInt(ethers.keccak256(ethers.toUtf8Bytes(doc.cid))) % SNARK_FIELD
      ).toString();

      // retrieve stored secret
      const secret = localStorage.getItem(`secret_${doc.cid}`);

      if (!secret) {
        toast.dismiss();
        return toast.error("Secret not found for this document");
      }

      const input = {
        secret,
        cidHash,
        root,
        pathElements,
        pathIndices,
      };

      console.log({
        secret,
        cidHash,
        root,
        pathElements,
        pathIndices,
      });
      const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        "/zk/documentOwnership.wasm",
        "/zk/documentOwnership_final.zkey",
      );

      const res = await api.post("/zkp/verify", {
        proof,
        publicSignals,
      });

      toast.dismiss();

      if (res.data.message === "Ownership verified") {
        toast.success("Ownership verified!");
      } else {
        toast.error("Verification failed");
      }
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Proof generation failed");
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <DashboardHeader name={user?.name} onLogout={() => dispatch(logout())} />

      <WalletDisplay wallet={user?.walletAddress} />

      <p className="font-medium">Total Documents: {docs.length}</p>

      <PatientAccessSection
        doctorAddress={doctorAddress}
        setDoctorAddress={setDoctorAddress}
        onGrantAccess={handleGrantAccess}
        granting={granting}
      />

      {grantedDoctor && (
        <AccessStatusCard
          doctorName={doctorName}
          doctorAddress={grantedDoctor}
          onRevoke={handleRevokeAccess}
          revoking={revoking}
        />
      )}

      {!showAddReport ? (
        <button
          onClick={() => setShowAddReport(true)}
          className="bg-green-600 text-white px-4 py-2 rounded w-fit"
        >
          + Add Report
        </button>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50 relative">
          <button
            onClick={() => setShowAddReport(false)}
            className="absolute top-2 right-2 text-red-600 font-bold"
          >
            ✕
          </button>

          <AddReport
            onUploadSuccess={() => {
              fetchDocs();
              setShowAddReport(false);
            }}
          />
        </div>
      )}

      <DocumentGrid
        docs={docs}
        onDelete={handleDelete}
        onProve={handleProveOwnership}
      />
    </div>
  );
};

export default PatientDashboard;

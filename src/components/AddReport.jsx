import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../slices/authSlice";
import toast from "react-hot-toast";
import api from "../api/api";

const AddReport = ({ onUploadSuccess }) => {
  const user = useSelector(selectAuthUser);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("Please select a file first!");
    if (!user || !user._id) return toast.error("User not found.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", user._id);
    formData.append("uploadedBy", user.role);

    try {
      setUploading(true);

      const { data } = await api.post("document/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { cid, secret } = data.data;

      localStorage.setItem(`secret_${cid}`, secret);

      toast.success(`Uploaded: ${data.data.filename}`);
      setFile(null);

      if (onUploadSuccess) onUploadSuccess();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-blue-300">
        Upload Report
      </h2>

      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-blue-400/30 rounded-lg p-2 bg-transparent text-white"
        />

        <button
          disabled={!file || uploading}
          type="submit"
          className={`rounded-lg py-2 text-white transition ${
            uploading || !file
              ? "bg-gray-500"
              : "bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 hover:scale-105"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AddReport;

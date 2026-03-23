import React from "react";

const DocumentGrid = ({ docs = [], onDelete = null, onProve = null }) => {
  if (!docs.length) {
    return (
      <div className="text-center text-gray-400 py-10">
        No documents uploaded yet 📄
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-blue-300">
        Your Documents
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {docs.map((doc) => (
          <div
            key={doc._id}
            className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition"
          >
            {/* Preview */}
            {doc.mimetype.startsWith("image/") ? (
              <img
                src={`http://127.0.0.1:8080/ipfs/${doc.cid}`}
                alt={doc.filename}
                className="w-full h-40 object-cover group-hover:scale-105 transition"
              />
            ) : (
              <div className="h-40 flex items-center justify-center bg-black/40 text-gray-400">
                PDF Preview
              </div>
            )}

            {/* Info */}
            <div className="p-3">
              <p className="text-sm font-medium text-white truncate">
                {doc.filename}
              </p>

              {/* Actions */}
              <div className="flex justify-center items-center flex-wrap gap-2 mt-3">
                {/* View → always available */}
                <button
                  onClick={() =>
                    window.open(
                      `http://127.0.0.1:8080/ipfs/${doc.cid}`,
                      "_blank",
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow"
                >
                  View
                </button>

                {/* Delete → only if provided */}
                {onDelete && (
                  <button
                    onClick={() => onDelete(doc._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}

                {/* Prove → only if provided */}
                {onProve && (
                  <button
                    onClick={() => onProve(doc)}
                    className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Prove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentGrid;

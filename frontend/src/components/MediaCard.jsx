import React, { useState } from "react";

function MediaCard({ item, onDelete }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this file?"
  );

  if (!confirmDelete) return;

  try {
    setLoading(true);

    // First delete
    await onDelete(item._id);

    // Then show success message
    setMessage("File deleted successfully ✅");

    // Hide message after 1 second
    setTimeout(() => {
      setMessage("");
    }, 1000);

  } catch (error) {
    setMessage("Failed to delete file ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full h-[250px] bg-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">

      {/* Media Container */}
      <div className="w-full h-[200px] bg-black">
        {item.filetype === "image" ? (
          <img
            src={item.url}
            alt="media"
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            controls
            className="w-full h-full object-cover"
          >
            <source src={item.url} />
          </video>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 text-center">

        {message && (
          <p className="text-green-400 text-sm mb-2 font-medium">
            {message}
          </p>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>

      </div>
    </div>
  );
}

export default MediaCard;

import React, { useState } from "react";
import axios from "axios";

function UploadMedia({ API, onUploadSuccess }) {
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loadingType, setLoadingType] = useState(null);

  // Separate error states
  const [imageError, setImageError] = useState("");
  const [videoError, setVideoError] = useState("");

  //  Max sizes
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

  //  Image Validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageError("");

    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed.");
      setImageFile(null);
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image size must be less than 5MB.");
      setImageFile(null);
      return;
    }

    setImageFile(file);
  };

  //  Video Validation
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideoError("");

    if (!file.type.startsWith("video/")) {
      setVideoError("Only video files are allowed.");
      setVideoFile(null);
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      setVideoError("Video size must be less than 50MB.");
      setVideoFile(null);
      return;
    }

    setVideoFile(file);
  };

  //  Upload Function (Logic NOT changed)
  const uploadFile = async (file, type) => {
    if (!file) {
      alert(`Please select a ${type}`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoadingType(type);

      const res = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (onUploadSuccess) {
        onUploadSuccess(res.data);
      }

      if (type === "image") {
        setImageFile(null);
        setImageError("");
      }

      if (type === "video") {
        setVideoFile(null);
        setVideoError("");
      }

    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Upload failed. Please try again.");
    } finally {
      setLoadingType(null);
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* IMAGE UPLOAD CARD */}
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Upload Image
          </h2>
          <p className="text-sm text-red-400 mb-4">
            * Only images are allowed AND Image size must be less than 5MB
          </p>
          {imageError && (
            <p className="text-sm text-red-400 mb-3">{imageError}</p>
          )}

          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="imageUpload"
            className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg cursor-pointer transition"
          >
            Select Image
          </label>

          {imageFile && (
            <p className="mt-3 text-sm text-slate-400 truncate">
              {imageFile.name}
            </p>
          )}

          <button
            onClick={() => uploadFile(imageFile, "image")}
            disabled={loadingType === "image"}
            className={`mt-6 w-full py-3 rounded-lg font-medium transition 
              ${loadingType === "image"
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
          >
            {loadingType === "image" ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        {/* VIDEO UPLOAD CARD */}
        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Upload Video
          </h2>
          <p className="text-sm text-red-400 mb-4">
            * Only video files are allowed AND Video size must be less than 50MB
          </p>
          {videoError && (
            <p className="text-sm text-red-400 mb-3">{videoError}</p>
          )}

          <input
            type="file"
            accept="video/*"
            id="videoUpload"
            onChange={handleVideoChange}
            className="hidden"
          />

          <label
            htmlFor="videoUpload"
            className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg cursor-pointer transition"
          >
            Select Video
          </label>

          {videoFile && (
            <p className="mt-3 text-sm text-slate-400 truncate">
              {videoFile.name}
            </p>
          )}

          <button
            onClick={() => uploadFile(videoFile, "video")}
            disabled={loadingType === "video"}
            className={`mt-6 w-full py-3 rounded-lg font-medium transition 
              ${loadingType === "video"
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
              } text-white`}
          >
            {loadingType === "video" ? "Uploading..." : "Upload Video"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default UploadMedia;

import React, { useState } from "react";
import MediaCard from "./MediaCard";

function MediaGallery({ media = [], onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // change how many items per page

  const totalPages = Math.ceil(media.length / itemsPerPage);

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedia = media.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full">

      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Media Gallery
        </h2>

        <span className="text-sm text-slate-400">
          {media.length} Items
        </span>
      </div>

      {/* Empty State */}
      {media.length === 0 ? (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <p className="text-slate-400 text-lg">
            No media uploaded yet
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Upload images or videos to see them here.
          </p>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentMedia.map((item) => (
              <MediaCard
                key={item._id}
                item={item}
                onDelete={onDelete}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-slate-400">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MediaGallery;

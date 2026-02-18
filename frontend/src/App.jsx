import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadMedia from "./components/UploadMedia";
import MediaGallery from "./components/MediaGallery";
import "./App.css";

const API = "http://localhost:5000/api/media";

function App() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get(API);
      setMedia(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadSuccess = () => {
    fetchMedia();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchMedia();
    } catch (err) {
      console.error(err);
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

    {/* HEADER */}
    <header className="border-b border-slate-700 bg-slate-900/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          Cloud Media Vault
        </h1>

        <p className="text-slate-400 mt-2 md:mt-0 text-sm md:text-base">
          Securely upload and manage your images & videos
        </p>
      </div>
    </header>

    {/* MAIN CONTENT */}
    <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">

      {/* Upload Section */}
      <section>
        <UploadMedia 
          API={API} 
          onUploadSuccess={handleUploadSuccess} 
        />
      </section>

      {/* Gallery Section */}
      <section>
        <MediaGallery 
          media={media} 
          onDelete={handleDelete} 
        />
      </section>

    </main>

  </div>
);

}

export default App;

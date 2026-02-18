const express = require("express");
const router = express.Router();

const {
  upload,
  uploadMedia,
  getAllMedia,
  deleteMedia,
} = require("../controllers/mediaController");

// Upload
router.post("/", upload.single("file"), uploadMedia);

// Get All
router.get("/", getAllMedia);

// Delete
router.delete("/:id", deleteMedia);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const Media = require("../models/Media");

// // Cloudinary Config
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET
// });

// // Multer Memory Storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// /* =========================
//    Upload Media
// ========================= */
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // Wrap upload_stream inside Promise
//     const uploadToCloudinary = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "media",        //  Upload to media folder
//             resource_type: "auto"   // auto detect image or video
//           },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );

//         stream.end(req.file.buffer);
//       });
//     };

//     const result = await uploadToCloudinary();

//     const newMedia = new Media({
//       url: result.secure_url,
//       public_id: result.public_id, // will include folder: media/filename
//       filetype: result.resource_type
//     });

//     await newMedia.save();

//     res.status(201).json(newMedia);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    Get All Media
// ========================= */
// router.get("/", async (req, res) => {
//   try {
//     const media = await Media.find().sort({ createdAt: -1 });
//     res.json(media);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* =========================
//    Delete Media
// ========================= */
// router.delete("/:id", async (req, res) => {
//   try {
//     const media = await Media.findById(req.params.id);

//     if (!media) {
//       return res.status(404).json({ message: "Media not found" });
//     }

//     await cloudinary.uploader.destroy(media.public_id, {
//       resource_type: media.filetype
//     });

//     await media.deleteOne();

//     res.json({ message: "Deleted successfully" });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

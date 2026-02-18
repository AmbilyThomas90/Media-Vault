const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Media = require("../models/Media");

// ==========================
// Cloudinary Config
// ==========================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ==========================
// Multer Memory Storage
// ==========================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ==========================
// Upload Media Controller
// ==========================
const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "media",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    const newMedia = new Media({
      url: result.secure_url,
      public_id: result.public_id,
      filetype: result.resource_type,
    });

    await newMedia.save();

    res.status(201).json(newMedia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// Get All Media Controller
// ==========================
const getAllMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// Delete Media Controller
// ==========================
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.filetype,
    });

    await media.deleteOne();

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  upload,
  uploadMedia,
  getAllMedia,
  deleteMedia,
};

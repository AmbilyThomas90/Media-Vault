const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({ origin: "http://media-vault-murex.vercel.app"}));
app.use(
  cors({
    origin: "https://media-vault-murex.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/media", require("./routes/mediaRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));

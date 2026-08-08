import metadataRouter from "./routes/metadata.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/metadata", metadataRouter);

app.get("/", (req, res) => {
  res.json({
    project: process.env.COLLECTION_NAME,
    status: "Running",
    reveal: process.env.REVEAL
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend Running: http://localhost:${PORT}`);
});
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(cors());

  console.log("Express server started...");

  const mainRoutes = require("./routes/main");
  server.use("/api", mainRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/questionnaires", require("./routes/questionnaires"));
app.use("/api/responses", require("./routes/responses"));

app.get("/", (req, res) => {
  res.send("Questionnaire API is running...");
});

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    console.log("MongoDB connected...");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 9000;

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware
app.use(express.static(path.join(__dirname, "../public")));

// Send file
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling endware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || "Internal server error");
});

app.listen(PORT, () =>
    console.log(`

  Listening on port ${PORT}
  http://localhost:${PORT}/

`),
);

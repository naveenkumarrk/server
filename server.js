const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files using an absolute path
app.use(express.static(path.join(__dirname, "public")));

// Routes
const booksRoute = require("./routes/book.route.js");
const recommendationRoutes = require("./routes/recommendation.route.js");

app.use("/books", booksRoute);
app.use("/recommendation", recommendationRoutes);

// Serve HTML pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/recommendation", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "recommendations.html"));
});

// MongoDB Connection
mongoose.connect("mongodb+srv://111naveenkumarrk:naveenRose1@backenddb.lbjki.mongodb.net/BooksAPI?retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        console.log("Database is connected");
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error occurred connecting to MongoDB:", err);
    });

module.exports = app; 
